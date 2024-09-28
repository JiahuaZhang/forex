import BigNumber from 'bignumber.js';
import { Candlestick, CandlestickData, CandlestickGranularity } from '../type/instrument';
import { Currency, InstrumentName } from '../type/primitives';
import { Oanda } from '../type/type';
import { getTimeDifference } from '~/lib/time';

const PIP = 10000;

// ask -- sell price, bid -- buy price
export const candleSpreadAnalysis = (candles: Candlestick[]) => {
  return candles.map(candle => ({
    spread: BigNumber(candle.ask!.h).minus(candle.bid!.l).multipliedBy(PIP).toNumber(),
    ask_spread: BigNumber(candle.ask!.h).minus(candle.ask!.l).multipliedBy(PIP).toNumber(),
    mid_spread: BigNumber(candle.mid!.h).minus(candle.mid!.l).multipliedBy(PIP).toNumber(),
    bid_spread: BigNumber(candle.bid!.h).minus(candle.bid!.l).multipliedBy(PIP).toNumber(),
    open_margin: BigNumber(candle.ask!.o).minus(candle.bid!.o).multipliedBy(PIP).toNumber(),
    close_margin: BigNumber(candle.ask!.c).minus(candle.bid!.c).multipliedBy(PIP).toNumber(),
    high_margin: BigNumber(candle.ask!.h).minus(candle.bid!.h).multipliedBy(PIP).toNumber(),
    low_margin: BigNumber(candle.ask!.l).minus(candle.bid!.l).multipliedBy(PIP).toNumber(),
    volume: candle.volume,
    time: candle.time,
  }));
};

// should check first 5 second
// and check first 15 minutes
const firstStepAnalysis = (currency: Currency, data: Oanda.Response.Candles) => {
  const { mid } = data.candles[0];
  const isIncreasing = BigNumber(mid!.c).isGreaterThan(mid!.o);
  const is_appreciated = data.instrument.startsWith(currency)
    ? (isIncreasing ? true : false)
    : (isIncreasing ? false : true);
  const state = BigNumber(mid!.o).isEqualTo(mid!.c) ? 'same' : is_appreciated ? 'appreciated' : 'depreciated' as const;
  const difference = BigNumber(mid!.c).minus(mid!.o);
  const change = difference.dividedBy(mid!.o).multipliedBy(100);
  const valuation = state === 'same' ? 0 : (state === 'appreciated' ? 1 : -1);

  return {
    currency,
    instrument: data.instrument,
    granularity: data.granularity,
    state,
    valuation,
    pip_difference: difference.multipliedBy(PIP).toNumber(),
    change: change.toNumber(),
    currency_change: change.multipliedBy(valuation).toNumber()
  };
};

type OandaCurrencyCandles = Record<InstrumentName, Oanda.Response.Candles[]>[];
export const firstCycleAnalysis = ({ currency, data, granularity = 'M15' }
  : { currency: Currency, data: OandaCurrencyCandles, granularity?: CandlestickGranularity; }) => {
  const matches = data.map(d => Object.values(d).flatMap(i => i).filter(item => item.granularity === granularity)).flatMap(i => i);
  return matches.map(match => firstStepAnalysis(currency, match));
};

export const multipleGranularityAnalysis = ({ currency, data }: { currency: Currency, data: OandaCurrencyCandles; }) => {
  const granularities: CandlestickGranularity[] = ['S5', 'M1', 'M15', 'H1'];
  const result = granularities.map(granularity => [granularity, firstCycleAnalysis({ currency, granularity, data })]);
  return Object.fromEntries(result) as Record<CandlestickGranularity, ReturnType<typeof firstCycleAnalysis>>;
};

const getMilestone = ({ candles, index, previousIndex = 0, change, isBaseCurrency }: {
  candles: Candlestick[];
  index: number;
  previousIndex: number;
} & ({
  change: 'stable';
  isBaseCurrency?: boolean;
} | {
  change: 'increase' | 'decrease',
  isBaseCurrency: boolean;
})
) => {
  if (change === 'stable') {
    return {
      candleStick: candles[index],
      state: 'stable',
      index,
      elapsed: getTimeDifference(candles[previousIndex].time, candles[index].time),
      elapsed_absolute: getTimeDifference(candles[0].time, candles[index].time),
      change: 0,
      change_percent: 0,
    };
  } else if (change === 'increase') {
    const diff = BigNumber(candles[index].mid!.o).minus(candles[previousIndex].mid!.o);
    return {
      candleStick: candles[index],
      state: isBaseCurrency ? 'appreciated' : 'depreciated',
      index,
      elapsed: getTimeDifference(candles[previousIndex].time, candles[index].time),
      elapsed_absolute: getTimeDifference(candles[0].time, candles[index].time),
      change: diff.multipliedBy(PIP).toNumber(),
      change_percent: diff.dividedBy(candles[previousIndex].mid!.o).multipliedBy(100).toNumber(),
    };
  } else {
    const diff = BigNumber(candles[index].mid!.o).minus(candles[previousIndex].mid!.o);
    return {
      candleStick: candles[index],
      state: isBaseCurrency ? 'depreciated' : 'appreciated',
      index,
      elapsed: getTimeDifference(candles[previousIndex].time, candles[index].time),
      elapsed_absolute: getTimeDifference(candles[0].time, candles[index].time),
      change: diff.multipliedBy(PIP).toNumber(),
      change_percent: diff.dividedBy(candles[previousIndex].mid!.o).multipliedBy(100).toNumber(),
    };
  }
};

const compareCandles = (prev: CandlestickData, current: CandlestickData) => {
  const { o, h, l, c } = current;
  const open = BigNumber(o);
  const high = BigNumber(h);
  const low = BigNumber(l);
  const close = BigNumber(c);

  let change_state = '';
  if (close.isGreaterThan(open)) {
    change_state = 'increase';
  } else if (close.isLessThan(open)) {
    change_state = 'decrease';
  } else {
    change_state = 'same';
  }

  let isAbsolute = false;
  if (change_state === 'increase') {
    if (high.isGreaterThan(prev.h) && low.isGreaterThan(prev.l)) {
      isAbsolute = true;
    }

  }
  if (change_state === 'decrease') {
    if (low.isLessThan(prev.l) && high.isLessThan(prev.h)) {
      isAbsolute = true;
    }
  }

  const isExpanding = high.isGreaterThan(prev.h) && low.isLessThan(prev.l);
  const isShriking = high.isLessThan(prev.h) && low.isGreaterThan(prev.l);
  let simple_state = 0;
  if (isAbsolute) {
    simple_state = change_state === 'increase' ? 1 : -1;
  }

  return { change_state, isAbsolute, isExpanding, isShriking, simple_state, current };
};

export const linearAnalysis = (data: Oanda.Response.Candles) => {
  const result = [];
  let trend_state = 0;
  for (let index = 1; index < data.candles.length; index++) {
    const comparision = {
      ...compareCandles(data.candles[index - 1].mid!, data.candles[index].mid!),
      time: data.candles[index].time,
      volume: data.candles[index].volume,
      complete: data.candles[index].complete,
    };
    if (comparision.simple_state === 0 && trend_state !== 0) {
      comparision.simple_state = trend_state;
    } else if (comparision.simple_state !== 0) {
      trend_state = comparision.simple_state / 2;
    }
    result.push(comparision);
  }
  return result;
};

export const upDownAnalysis = (currency: Currency, data: Oanda.Response.Candles) => {
  const { candles, instrument } = data;
  const starting = candles[0];
  let firstHighestIndex = 0;
  let firstLowestIndex = 0;

  for (let index = 0; index < candles.length; index++) {
    if (candles[index].mid!.h > candles[firstHighestIndex].mid!.h) {
      firstHighestIndex = index;
    }

    if (candles[index].mid!.l < candles[firstHighestIndex].mid!.l) {
      firstLowestIndex = index;
    }
  }

  const milestones = [{ candleStick: starting, state: 'start', index: 0, elapsed: '0', elapsed_absolute: '0' },];
  if (firstHighestIndex === firstLowestIndex) {
    const nextLowest = getMilestone({ candles, index: firstLowestIndex, previousIndex: 0, change: 'stable' });
    milestones.push(nextLowest);
    const nextHighest = getMilestone({ candles, index: firstHighestIndex, previousIndex: firstLowestIndex, change: 'stable' });
    milestones.push(nextHighest);
    return milestones;
  }

  const isBaseCurrency = instrument.startsWith(currency);
  if (firstHighestIndex < firstLowestIndex) {
    const nextHighest = getMilestone({ candles, index: firstHighestIndex, previousIndex: 0, change: 'increase', isBaseCurrency });
    milestones.push(nextHighest);
    const nextLowest = getMilestone({ candles, index: firstLowestIndex, previousIndex: firstHighestIndex, change: 'decrease', isBaseCurrency });
    milestones.push(nextLowest);
    return milestones;
  } else {
    const nextLowest = getMilestone({ candles, index: firstLowestIndex, previousIndex: 0, change: 'decrease', isBaseCurrency });
    milestones.push(nextLowest);
    const nextHighest = getMilestone({ candles, index: firstHighestIndex, previousIndex: firstLowestIndex, change: 'increase', isBaseCurrency });
    milestones.push(nextHighest);
    return milestones;
  }
};

export const allGranularityUpDownAnalysis = () => {};

// up down analysis:
// after economic event calendar
// the first lowest, then rebound
// need to know the time stamp as well
// should have time differences comparing the previous time-stampe
// elapsed time as progress bar?, let's say the first peak or dip, comparing its progress in the whole graph