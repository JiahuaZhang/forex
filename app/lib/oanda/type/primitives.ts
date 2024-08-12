export type DecimalNumber = `${number}`;

export type AccountUnits = `${number}`;

// https://en.wikipedia.org/wiki/ISO_4217
const currencies = ["AUD", "CAD", "CHF", "CNH", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "JPY", "MXN", "NOK", "NZD", "PLN", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"] as const;
export type Currency = typeof currencies[number];

export type Tag = {
  type: string;
  name: string;
};

export const AllInstrumentName = [
  "USD_CNH", "NZD_CAD", "EUR_CHF", "SGD_CHF", "EUR_CZK", "NZD_JPY", "CHF_HKD", "EUR_GBP", "EUR_NOK", "USD_CZK", "GBP_NZD", "EUR_SEK", "USD_SGD", "GBP_PLN", "CAD_HKD", "USD_CHF", "AUD_HKD", "NZD_CHF", "AUD_CHF", "GBP_CHF", "USD_THB", "GBP_CAD", "EUR_HKD", "CHF_JPY", "GBP_HKD", "EUR_NZD", "AUD_SGD", "EUR_JPY", "EUR_TRY", "USD_JPY", "SGD_JPY", "GBP_ZAR", "ZAR_JPY", "NZD_SGD", "GBP_JPY", "USD_TRY", "TRY_JPY", "EUR_SGD", "EUR_AUD", "USD_CAD", "CAD_CHF", "USD_NOK", "AUD_USD", "AUD_JPY", "EUR_ZAR", "CHF_ZAR", "USD_HKD", "USD_PLN", "GBP_AUD", "USD_DKK", "EUR_USD", "USD_ZAR", "CAD_JPY", "NZD_USD", "NZD_HKD", "AUD_NZD", "CAD_SGD", "GBP_USD", "USD_MXN", "AUD_CAD", "USD_HUF", "EUR_CAD", "EUR_DKK", "USD_SEK", "GBP_SGD", "EUR_PLN", "HKD_JPY", "EUR_HUF"
] as const;
// export type InstrumentName = `${Currency}_${Currency}`;
export type InstrumentName = typeof AllInstrumentName[number];

export type InstrumentType = 'CURRENCY' | 'CFD' | 'METAL';

export type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

export type FinancingDayOfWeek = {
  dayOfWeek: DayOfWeek;
  daysCharged: number;
};

export type InstrumentFinancing = {
  longRate: DecimalNumber;
  shortRate: DecimalNumber;
  financingDaysOfWeek: FinancingDayOfWeek[];
};

export type Instrument = {
  name: InstrumentName;
  type: InstrumentType;
  displayName: string;
  pipLocation: number;
  displayPrecision: number;
  tradeUnitsPrecision: number;
  minimumTradeSize: DecimalNumber;
  maximumTrailingStopDistance: DecimalNumber;
  minimumGuaranteedStopLossDistance: DecimalNumber;
  minimumTrailingStopDistance: DecimalNumber;
  maximumPositionSize: DecimalNumber;
  maximumOrderUnits: DecimalNumber,
  marginRate: DecimalNumber,
  commission: InstrumentCommission,
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderModeForInstrument,
  guaranteedStopLossOrderExecutionPremium: DecimalNumber,
  guaranteedStopLossOrderLevelRestriction: GuaranteedStopLossOrderLevelRestriction,
  financing: InstrumentFinancing,
  tags: Tag[],
};

// https://www.rfc-editor.org/rfc/rfc3339.txt
export type DateTime = string;

export type AcceptDatetimeFormat = 'UNIX' | 'RFC3339';

export type InstrumentCommission = {
  commission: DecimalNumber;
  unitsTraded: DecimalNumber;
  minimumCommission: DecimalNumber;
};

export type GuaranteedStopLossOrderModeForInstrument = 'DISABLED' | 'ALLOWED' | 'REQUIRED';

export type GuaranteedStopLossOrderLevelRestriction = {
  volume: DecimalNumber;
  priceRange: DecimalNumber;
};

export type Direction = 'LONG' | 'SHORT';

// Can contain any combination of the characters “M” (midpoint candles) “B” (bid candles) and “A” (ask candles).
export const AllPricingComponent = ['M', 'B', 'A'] as const;
export type PricingComponent = typeof AllPricingComponent[number];

export type ConversionFactor = {
  factor: DecimalNumber;
};

export type HomeConversionFactors = {
  gainQuoteHome: ConversionFactor;
  lossQuoteHome: ConversionFactor;
  gainBaseHome: ConversionFactor;
  lossBaseHome: ConversionFactor;
};