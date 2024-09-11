import { PriceValue } from './pricing-common';
import { DateTime, DecimalNumber, InstrumentName } from './primitives';

export const AllCandlestickGranularity = ['S5', 'S10', 'S15', 'S30', 'M1', 'M2', 'M3', 'M4', 'M5', 'M10', 'M15', 'M30', 'H1', 'H2', 'H3', 'H4', 'H6', 'H8', 'H12', 'D', 'W', 'M'] as const;

export type CandlestickGranularity = typeof AllCandlestickGranularity[number];

export type WeeklyAlignment = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

export type Candlestick = {
  time: DateTime;
  bid?: CandlestickData;
  ask?: CandlestickData;
  mid?: CandlestickData;
  volume: number;
  complete: boolean;
};

export type CandlestickData = {
  o: PriceValue;
  h: PriceValue;
  l: PriceValue;
  c: PriceValue;
};

export type CandlestickResponse = {
  instrument: InstrumentName;
  granularity: CandlestickGranularity;
  candles: Candlestick[];
};

export type OrderBook = {
  instrument: InstrumentName;
  time: DateTime;
  price: PriceValue;
  bucketWidth: PriceValue;
  buckets: OrderBookBucket[];
};

export type OrderBookBucket = {
  price: PriceValue;
  longCountPercent: DecimalNumber;
  shortCountPercent: DecimalNumber;
};

export type PositionBook = {
  instrument: InstrumentName;
  time: DateTime;
  price: PriceValue;
  bucketWidth: PriceValue;
  buckets: PositionBookBucket[];
};

export type PositionBookBucket = {
  price: PriceValue;
  longCountPercent: DecimalNumber;
  shortCountPercent: DecimalNumber;
};

export type OandaCandlesResponse = {
  instrument: InstrumentName;
  granularity: CandlestickGranularity;
  candles: Candlestick[];
};