import { PriceValue } from './pricing-common';
import { DateTime, DecimalNumber, GuaranteedStopLossOrderLevelRestriction } from './primitives';
import { TakeProfitDetails, TradeID } from './trade';
import { ClientExtensions, ClientID, GuaranteedStopLossDetails, StopLossDetails, TrailingStopLossDetails, TransactionID } from './transaction';

export type Order = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
};

export type OrderState = 'PENDING' | 'FILLED' | 'TRIGGERED' | 'CANCELLED';

export type MarketOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  timeInForce: TimeInForce;
  priceBound: PriceValue;
  positionFill: OrderPositionFill;
  tradeClose: MarketOrderTradeClose;
  longPositionCloseout: MarketOrderPositionCloseout;
  shortPositionCloseout: MarketOrderPositionCloseout;
  marginCloseout: MarketOrderMarginCloseout;
  delayedTradeClose: MarketOrderDelayedTradeClose;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TransactionID;
  cancelledTime: DateTime;
};

export type FixedPriceOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  positionFill: OrderPositionFill;
  tradeState: string;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TradeID;
  cancelledTime: DateTime;
};

export type LimitOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TradeID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type StopOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TradeID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type MarketIfTouchedOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  tradeClientExtensions: ClientExtensions;
  initialMarketPrice: PriceValue;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TradeID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type TakeProfitOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TransactionID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type StopLossOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  guaranteedExecutionPremium: DecimalNumber;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  guaranteed: boolean;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TransactionID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type GuaranteedStopLossOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  guaranteedExecutionPremium: DecimalNumber;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TransactionID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type TrailingStopLossOrder = {
  id: OrderID;
  createTime: DateTime;
  state: OrderState;
  clientExtensions: ClientExtensions;
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  trailingStopValue: PriceValue;
  fillingTransactionID: TransactionID;
  filledTime: DateTime;
  tradeOpenedID: TradeID;
  tradeReducedID: TradeID;
  tradeClosedIDs: TradeID[];
  cancellingTransactionID: TransactionID;
  cancelledTime: DateTime;
  replacesOrderID: OrderID;
  replacedByOrderID: OrderID;
};

export type MarketOrderRequest = {
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  timeInForce?: TimeInForce;
  priceBound: PriceValue;
  positionFill: OrderPositionFill;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type LimitOrderRequest = {
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type StopOrderRequest = {
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type MarketIfTouchedOrderRequest = {
  type: OrderType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type TakeProfitOrderRequest = {
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
};

export type StopLossOrderRequest = {
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  guaranteed: boolean;
  clientExtensions: ClientExtensions;
};

export type GuaranteedStopLossOrderRequest = {
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
};

export type TrailingStopLossOrderRequest = {
  type: OrderType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  triggerCondition: OrderTriggerCondition;
  clientExtensions: ClientExtensions;
};

export type OrderID = `${number}`;

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP' | 'MARKET_IF_TOUCHED' | 'TAKE_PROFIT' | 'STOP_LOSS' | 'GUARANTEED_STOP_LOSS' | 'TRAILING_STOP_LOSS' | 'FIXED_PRICE';

export type CancellableOrderType = 'LIMIT' | 'STOP' | 'MARKET_IF_TOUCHED' | 'TAKE_PROFIT' | 'STOP_LOSS' | 'GUARANTEED_STOP_LOSS' | 'TRAILING_STOP_LOSS';

export type OrderState = 'PENDING' | 'FILLED' | 'TRIGGERED' | 'CANCELLED';

export type OrderStateFilter = 'PENDING' | 'FILLED' | 'TRIGGERED' | 'CANCELLED' | 'ALL';

export type OrderIdentifier = {
  orderID: OrderID;
  clientOrderID: ClientID;
};

export type OrderSpecifier = string;

export type TimeInForce = 'GTC' | 'GTD' | 'GFD' | 'FOK' | 'IOC';

export type OrderPositionFill = 'OPEN_ONLY' | 'REDUCE_FIRST' | 'REDUCE_ONLY' | 'DEFAULT';

export type OrderTriggerCondition = 'DEFAULT' | 'INVERSE' | 'BID' | 'ASK' | 'MID';

export type DynamicOrderState = {
  id: OrderID;
  trailingStopValue: PriceValue;
  triggerDistance: PriceValue;
  isTriggerDistanceExact: boolean;
};

export type UnitsAvailableDetails = {
  long: DecimalNumber;
  short: DecimalNumber;
};

export type UnitsAvailable = {
  default: UnitsAvailableDetails;
  reduceFirst: UnitsAvailableDetails;
  reduceOnly: UnitsAvailableDetails;
  openOnly: UnitsAvailableDetails;
};

export type GuaranteedStopLossOrderEntryData = {
  minimumDistance: DecimalNumber;
  premium: DecimalNumber;
  levelRestriction: GuaranteedStopLossOrderLevelRestriction;
};