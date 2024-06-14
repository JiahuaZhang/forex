import { OrderID, StopLossOrder, TakeProfitOrder, TimeInForce, TrailingStopLossOrder } from './order';
import { PriceValue } from './pricing-common';
import { AccountUnits, DateTime, DecimalNumber, InstrumentName } from './primitives';
import { ClientExtensions } from './transaction';

export type TradeID = `${number}`;

export type TradeState = 'OPEN' | 'CLOSED' | 'CLOSED_WHEN_TRADABLE';

export type TradeStateFilter = 'OPEN' | 'CLOSED' | 'CLOSE_WHEN_TRADEABLE' | 'ALL';

export type TradeSpecifier = string;

export type Trade = {
  id: TradeID;
  instrument: InstrumentName;
  price: PriceValue;
  openTime: DateTime;
  state: TradeState;
  initialUnits: DecimalNumber;
  initialMarginRequired: AccountUnits;
  currentUnits: DecimalNumber;
  realizedPL: AccountUnits;
  unrealizedPL: AccountUnits;
  marginUsed: AccountUnits;
  averageClosePrice: PriceValue;
  closingTransactionIDs: TradeID[];
  financing: AccountUnits;
  dividendAdjustment: AccountUnits;
  closeTime: DateTime;
  clientExtensions: ClientExtensions;
  takeProfitOrder: TakeProfitOrder;
  stopLossOrder: StopLossOrder;
  trailingStopLossOrder: TrailingStopLossOrder;
};

export type TradeSummary = {
  id: TradeID;
  instrument: InstrumentName;
  price: PriceValue;
  openTime: DateTime;
  state: TradeState;
  initialUnits: DecimalNumber;
  initialMarginRequired: AccountUnits;
  currentUnits: DecimalNumber;
  realizedPL: AccountUnits;
  unrealizedPL: AccountUnits;
  marginUsed: AccountUnits;
  averageClosePrice: PriceValue;
  closingTransactionIDs: TradeID[];
  financing: AccountUnits;
  dividendAdjustment: AccountUnits;
  closeTime: DateTime;
  clientExtensions: ClientExtensions;
  takeProfitOrderID: OrderID;
  stopLossOrderID: OrderID;
  guaranteedStopLossOrderID: OrderID;
  trailingStopLossOrderID: OrderID;
};

export type CalculatedTradeState = {
  id: TradeID;
  unrealizedPL: AccountUnits;
  marginUsed: AccountUnits;
};

export type TakeProfitDetails = {
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type TradePL = 'POSITIVE' | 'NEGATIVE' | 'ZERO';