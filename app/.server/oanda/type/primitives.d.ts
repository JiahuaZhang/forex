export type DecimalNumber = `${number}`;

export type AccountUnits = `${number}`;

// https://en.wikipedia.org/wiki/ISO_4217
export type Currency = string;

export type Tag = {
  type: string;
  name: string;
};

export type InstrumentName = `${Currency}_${Currency}`;

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
export type PricingComponent = string;

export type ConversionFactor = {
  factor: DecimalNumber;
};

export type HomeConversionFactors = {
  gainQuoteHome: ConversionFactor;
  lossQuoteHome: ConversionFactor;
  gainBaseHome: ConversionFactor;
  lossBaseHome: ConversionFactor;
};