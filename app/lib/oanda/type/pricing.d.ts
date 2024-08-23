import { UnitsAvailable } from './order';
import { PriceBucket, PriceValue } from './pricing-common';
import { Currency, DateTime, DecimalNumber, InstrumentName } from './primitives';

export type ClientPrice = {
  type: string;
  instrument: InstrumentName;
  time: DateTime;
  status?: PriceStatus;
  tradeable: boolean;
  bids: PriceBucket[];
  asks: PriceBucket[];
  closeoutBid: PriceValue;
  closeoutAsk: PriceValue;
  quoteHomeConversionFactors?: QuoteHomeConversionFactors;
  unitsAvailable?: UnitsAvailable;
};

export type PriceStatus = 'tradeable' | 'non' | 'invalid';

export type QuoteHomeConversionFactors = {
  positiveUnits: DecimalNumber;
  negativeUnits: DecimalNumber;
};

export type HomeConversions = {
  currency: Currency;
  accountGain: DecimalNumber;
  accountLoss: DecimalNumber;
  positionValue: DecimalNumber;
};

export type PricingHeartbeat = {
  type: string;
  time: DateTime;
};

export type CandleSpecification = string;