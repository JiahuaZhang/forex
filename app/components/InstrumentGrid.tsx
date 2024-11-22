import { Radio, Tooltip } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { ChartOptions, createChart, IPriceLine } from 'lightweight-charts';
import { Suspense, useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { getCandlesAnalysis } from '~/.server/oanda/instrument';
import { convertCandle } from '~/lib/chart/useCandleChart';
import { Currency } from '~/lib/oanda/currency';
import { Candlestick, CandlestickData, CandlestickGranularity, OandaCandlesResponse } from '~/lib/oanda/type/instrument';

type Props = {
  data: Awaited<ReturnType<typeof getCandlesAnalysis>>;
  currency: Currency;
};

type Price = 'ask' | 'bid' | 'mid';

type Analysis = 'candles' | 'log-return';

const getGranularities = (data: Props['data']) => [...new Set(data.flatMap(d => Object.values(d).flatMap(arr => arr.map(a => a.granularity))))];

const getOrganized = ({ data, currency }: Props) => {
  const result: Partial<Record<CandlestickGranularity, OandaCandlesResponse[]>> = {};

  data.forEach(d => {
    Object.entries(d).forEach(([instrument, analysisData]) => {
      analysisData.forEach(a => {
        if (a.granularity in result) {
          result[a.granularity]!.push(a);
        } else {
          result[a.granularity] = [a];
        }
      });
    });
  });

  Object.values(result).forEach(value => {
    result[value[0].granularity] = value.sort((a, b) => {
      const aStartsWithBase = a.instrument.startsWith(currency);
      const bStartsWithBase = b.instrument.startsWith(currency);

      if (aStartsWithBase && !bStartsWithBase) return -1;
      if (!aStartsWithBase && bStartsWithBase) return 1;
      return a.instrument.localeCompare(b.instrument);
    });
  });


  return result;
};

export const InstrumentGrid = ({ currency, data }: Props) => {
  const allGranularities = getGranularities(data);
  const organizedData = getOrganized({ data, currency });

  return <InternalGrid granularities={allGranularities} data={organizedData} currency={currency} />;
};


const InternalGrid = ({ granularities, data, currency }: { currency: Currency, granularities: CandlestickGranularity[], data: ReturnType<typeof getOrganized>; }) => {
  const granularityOptions = granularities.map(value => ({ label: value, value }));
  const [granularity, setGranularity] = useState(granularities[0]);
  const [pricing, setPricing] = useState<Price>('mid');
  const [analysis, setAnalysis] = useState<Analysis>('candles');

  return <div un-m='2'>
    <header un-grid='~' un-grid-flow='col' un-justify='between' >
      <Radio.Group options={granularityOptions}
        optionType='button'
        buttonStyle='solid'
        value={granularity}
        onChange={value => setGranularity(value.target.value)} />

      <Radio.Group value={analysis} onChange={(e) => setAnalysis(e.target.value)} optionType='button' buttonStyle='solid'>
        <Radio value='candles'>candles</Radio>
        <Radio value='log-return'>log return</Radio>
      </Radio.Group>

      <Radio.Group value={pricing} onChange={(e) => setPricing(e.target.value)} optionType='button' buttonStyle='solid'>
        <Radio value='ask'>Ask</Radio>
        <Radio value='mid'>Mid</Radio>
        <Radio value='bid'>Bid</Radio>
      </Radio.Group>
    </header>
    <CandlesGrid currency={currency} price={pricing} data={data[granularity] ?? []} analysis={analysis} />
  </div>;
};

const CandlesGrid = ({ currency, price, data, analysis }: { currency: Currency, price: Price; data: OandaCandlesResponse[]; analysis: Analysis; }) => {
  return <Suspense>{
    data.map(d => <Candles key={d.instrument} currency={currency} price={price} data={d} analysis={analysis} />)
  }</Suspense>;
};

const chartOptions = {
  localization: { timeFormatter: (time) => dayjs(time as unknown as number * 1000).format('YYYY-MM-DD HH:mm:ss'), },
  timeScale: { timeVisible: true }
} as ChartOptions;

type CandlesStickAnalysis = CandlestickData & {
  'log_return': number;
};
type CandleStickAnalysis = Candlestick & {
  ask?: CandlesStickAnalysis;
  bid?: CandlesStickAnalysis,
  mid?: CandlesStickAnalysis,
};
const addLogReturns = (data: Candlestick[]) => data.map(d => {
  if (d.ask) {
    d.ask = {
      ...d.ask,
      'log_return': Math.log(BigNumber(d.ask!.c).dividedBy(d.ask!.o).toNumber())
    } as CandlesStickAnalysis;
  }

  if (d.bid) {
    d.bid = {
      ...d.bid,
      'log_return': Math.log(BigNumber(d.bid!.c).dividedBy(d.bid!.o).toNumber())
    } as CandlesStickAnalysis;
  }

  if (d.mid) {
    d.mid = {
      ...d.bid,
      'log_return': Math.log(BigNumber(d.mid!.c).dividedBy(d.mid!.o).toNumber())
    } as CandlesStickAnalysis;
  }
  return d as CandleStickAnalysis;
});

const Candles = ({ currency, price, data, analysis }: { currency: Currency, price: Price; data: OandaCandlesResponse; analysis: Analysis; }) => {
  const [base, quote] = data.instrument.split('_');
  const id = `${data.instrument}-${data.granularity}-${price}`;
  const candles = convertCandle(data.candles, price);
  const newData = addLogReturns(data.candles);

  useEffect(() => {
    if (!document || analysis !== 'candles') return;

    const chart = createChart(document.getElementById(id)!, chartOptions);
    const mainSeries = chart.addCandlestickSeries({ lastValueVisible: false, priceScaleId: 'main' });
    mainSeries.setData(candles as any);
    const volumeData = candles.map(d => ({ time: d.time, value: d.volume }));
    const volumeSeries = chart.addHistogramSeries({ priceScaleId: 'volume', lastValueVisible: false, });
    volumeSeries.setData(volumeData as any);
    chart.priceScale('main').applyOptions({ scaleMargins: { top: 0.1, bottom: 0.4 } });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    chart.timeScale().fitContent();

    let lastVolumePriceLine: IPriceLine | null = null;
    let lastMainPriceLine: IPriceLine | null = null;

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) return;
      const volume = param.seriesData.get(volumeSeries);
      const main = param.seriesData.get(mainSeries);

      if (lastVolumePriceLine) {
        volumeSeries.removePriceLine(lastVolumePriceLine);
      }
      if (lastMainPriceLine) {
        mainSeries.removePriceLine(lastMainPriceLine);
      }
      if (volume) {
        lastVolumePriceLine = volumeSeries.createPriceLine({ price: (volume as any).value });
      }
      if (main) {
        lastMainPriceLine = mainSeries.createPriceLine({ price: (main as any).open });
      }
    });

    return () => chart.remove();

  }, [document, id, analysis]);

  return <div>
    <header>
      <span un-text={`${currency === base ? 'blue-5' : ''}`} > {base} </span>
      /
      <span un-text={`${currency === quote ? 'purple-6' : ''}`} > {quote} </span>
    </header>
    {analysis === 'candles' && <main id={id} un-h='96' />}
    {
      analysis === 'log-return' &&
      <LineChart data={newData} width={1200} height={600} >
        <YAxis />
        <XAxis />
        <Tooltip />
        <Line dataKey='mid.log_return' />
      </LineChart>
    }
  </div>;
};
;
