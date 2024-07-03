import { oandaUrl } from './account';
import { Candlestick, CandlestickGranularity, OrderBook, WeeklyAlignment } from './type/instrument';
import { AcceptDatetimeFormat, DateTime, InstrumentName, PricingComponent } from './type/primitives';

type CandlesProps = {
  AcceptDatetimeFormat?: AcceptDatetimeFormat;
  instrument: InstrumentName;
  price?: PricingComponent;
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
  granularity: 'M15',
  count: 100
};

export const getCandles = async ({ AcceptDatetimeFormat = defaultCandlesProps.AcceptDatetimeFormat, instrument, price = defaultCandlesProps.price, granularity = defaultCandlesProps.granularity, count = defaultCandlesProps.count, from, to, smooth, includeFirst, dailyAlignment, alignmentTimezone, weeklyAlignment }: CandlesProps) => {
  const response = await fetch(`${oandaUrl}/v3/instruments/${instrument}/candles?granularity=${granularity}&price=${price}&count=${count}`, {
    headers: {
      Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Accept-Datetime-Format': AcceptDatetimeFormat!
    }
  });

  return await response.json() as {
    instrument: InstrumentName;
    granularity: CandlestickGranularity;
    candles: Candlestick[];
  };
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
