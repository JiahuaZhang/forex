import { PriceValue } from './pricing-common';
import { AccountUnits, DecimalNumber, InstrumentName } from './primitives';
import { TradeID } from './trade';

export type Position = {
  instrument: InstrumentName;
  pl: AccountUnits;
  unrealizedPL: AccountUnits;
  marginUsed: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  commission: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
  long: PositionSide;
  short: PositionSide;
};

export type PositionSide = {
  units: DecimalNumber;
  averagePrice: PriceValue;
  tradeIDs: TradeID[];
  pl: AccountUnits;
  unrealizedPL: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
};

export type CalculatedPositionState = {
  instrument: InstrumentName;
  netUnrealizedPL: AccountUnits;
  longUnrealizedPL: AccountUnits;
  shortUnrealizedPL: AccountUnits;
  marginUsed: AccountUnits;
};