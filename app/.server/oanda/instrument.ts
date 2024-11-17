import { Oanda } from '~/lib/oanda/type/type';
import { CandlestickGranularity, OrderBook, PositionBook, WeeklyAlignment } from '../../lib/oanda/type/instrument';
import { AcceptDatetimeFormat, DateTime, InstrumentName, PricingComponent } from '../../lib/oanda/type/primitives';
import { oandaUrl } from './account';

type CandlesProps = {
  AcceptDatetimeFormat?: AcceptDatetimeFormat;
  instrument: InstrumentName;
  price?: PricingComponent | 'MB' | 'MA' | 'BA' | 'MBA';
  granularity?: CandlestickGranularity;
  count?: number; // default 500, max 5000
  from?: DateTime;
  to?: DateTime;
  smooth?: boolean;
  includeFirst?: boolean; // default True
  dailyAlignment?: number; // default 17, min 0, max 23
  alignmentTimezone?: string; // default America/New_York
  weeklyAlignment?: WeeklyAlignment; // default Friday
};

const defaultCandlesProps: CandlesProps = {
  AcceptDatetimeFormat: 'UNIX',
  instrument: 'GBP_USD',
  price: 'M',
  granularity: 'H1',
  count: 200
};

export const getCandles = async ({ AcceptDatetimeFormat = defaultCandlesProps.AcceptDatetimeFormat, instrument, price = defaultCandlesProps.price, granularity = defaultCandlesProps.granularity, count = defaultCandlesProps.count, from, to, smooth, includeFirst, dailyAlignment, alignmentTimezone, weeklyAlignment }: CandlesProps) => {
  const url = `${oandaUrl}/v3/instruments/${instrument}/candles?granularity=${granularity}&price=${price}&count=${count}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}${smooth ? `&smooth=${smooth}` : ''}${includeFirst ? `&includeFirst=${includeFirst}` : ''}${dailyAlignment ? `&dailyAlignment=${dailyAlignment}` : ''}${alignmentTimezone ? `&alignmentTimezone=${alignmentTimezone}` : ''}${weeklyAlignment ? `&weeklyAlignment=${weeklyAlignment}` : ''}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Accept-Datetime-Format': AcceptDatetimeFormat!
    }
  });

  return await response.json() as Oanda.Response.Candles;
};

export const getOrderBook = async (
  { AcceptDatetimeFormat, instrument, time }
    : {
      AcceptDatetimeFormat?: AcceptDatetimeFormat;
      instrument: InstrumentName;
      time?: DateTime;
    }
) => {
  const response = await fetch(`${oandaUrl}/v3/instruments/${instrument}/orderBook`, {
    headers: { Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`, }
  });

  return await response.json() as { orderBook: OrderBook; };
};

export const getPositionBook = async (
  { AcceptDatetimeFormat, instrument, time }
    : {
      AcceptDatetimeFormat?: AcceptDatetimeFormat;
      instrument: InstrumentName;
      time?: DateTime;
    }
) => {
  const response = await fetch(`${oandaUrl}/v3/instruments/${instrument}/positionBook`, {
    headers: { Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`, }
  });

  return await response.json() as { positionBook: PositionBook; };
};

const get1CandleAnalysis = async ({ instrument, from }: { instrument: InstrumentName; from: DateTime; }) => {
  const granularities: CandlestickGranularity[] = ['S5', 'M1', 'M15', 'H1'];
  const result = granularities.map(granularity => getCandles({ instrument, granularity, price: 'MBA', from }));
  return await Promise.all(result);
};

export const getCandlesAnalysis = async ({ instruments, from }: { instruments: InstrumentName[]; from: DateTime; }) => {
  const result = instruments.map(async instrument => ({ [instrument]: await get1CandleAnalysis({ from, instrument }) }));
  return await Promise.all(result);
};