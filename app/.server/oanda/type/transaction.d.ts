import { AccountID } from './account';
import { OrderID, OrderTriggerCondition, TimeInForce } from './order';
import { PriceValue } from './pricing-common';
import { AccountUnits, Currency, DateTime, DecimalNumber, InstrumentName } from './primitives';
import { TakeProfitDetails, TradeID } from './trade';

export type Transaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
};

export type CreateTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  type: TransactionType;
  divisionID: number;
  siteID: number;
  accountUserID: number;
  accountNumber: number;
  homeCurrency: Currency;
};

export type CloseTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
};

export type ReopenTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
};

export type ClientConfigureTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  alias: string;
  marginRate: DecimalNumber;
};

export type ClientConfigureRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  alias: string;
  marginRate: DecimalNumber;
  rejectReason: TransactionRejectReason;
};

export type TransferfundsTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  amount: AccountUnits;
  fundingReason: FundingReason;
  comment: string;
  accountBalance: AccountUnits;
};

export type TransferFundsRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  amount: AccountUnits;
  fundingReason: FundingReason;
  comment: string;
  rejectReason: TransactionRejectReason;
};

export type MarketOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: AccountUnits;
  timeInForce: TimeInForce;
  priceBound: PriceValue;
  positionFill: OrderPositionFill;
  tradeClose: MarketOrderTradeClose;
  longPositionCloseout: MarketOrderPositionCloseout;
  shortPositionCloseout: MarketOrderPositionCloseout;
  marginCloseout: MarketOrderMarginCloseout;
  delayedTradeClose: MarketOrderDelayedTradeClose;
  reason: MarketOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type MarketOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: AccountUnits;
  timeInForce: TimeInForce;
  priceBound: PriceValue;
  positionFill: OrderPositionFill;
  tradeClose: MarketOrderTradeClose;
  longPositionCloseout: MarketOrderPositionCloseout;
  shortPositionCloseout: MarketOrderPositionCloseout;
  marginCloseout: MarketOrderMarginCloseout;
  delayedTradeClose: MarketOrderDelayedTradeClose;
  reason: MarketOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  rejectReason: TransactionRejectReason;
};

export type FixedPriceOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  positionFill: OrderPositionFill;
  tradeState: string;
  reason: FixedPriceOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
};

export type LimitOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: LimitOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  replacesOrderID: OrderID;
  cancellingTransactionID: TransactionID;
};

export type LimitOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: LimitOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  intendedReplacesOrderID: OrderID;
  rejectReason: TransactionRejectReason;
};

export type StopOrderTransactoin = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: StopOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  replacesOrderID: OrderID;
  cancellingTransactionID: TransactionID;
};

export type StopOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: StopOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  intendedReplacesOrderID: OrderID;
  rejectReason: TransactionRejectReason;
};

export type MarketIfTouchedOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: MarketIfTouchedOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  replacesOrderID: OrderID;
  cancellingTransactionID: TransactionID;
};

export type MarketIfTouchedOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  units: DecimalNumber;
  price: PriceValue;
  priceBound: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  positionFill: OrderPositionFill;
  triggerCondition: OrderTriggerCondition;
  reason: MarketIfTouchedOrderReason;
  clientExtensions: ClientExtensions;
  takeProfitOnFill: TakeProfitDetails;
  stopLossOnFill: StopLossDetails;
  trailingStopLossOnFill: TrailingStopLossDetails;
  guaranteedStopLossOnFill: GuaranteedStopLossDetails;
  tradeClientExtensions: ClientExtensions;
  intendedReplacesOrderID: OrderID;
  rejectReason: TransactionRejectReason;
};

export type TakeProfitOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  reason: TakeProfitOrderReason;
  clientExtensions: ClientExtensions;
  orderFillTransactionID: TransactionID;
  replacesOrderID: OrderID;
  cancellingTransactionID: TransactionID;
};

export type TakeProfitOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  reason: TakeProfitOrderReason;
  clientExtensions: ClientExtensions;
  orderFillTransactionID: TransactionID;
  intendedReplacesOrderID: OrderID;
  rejectReason: TransactionRejectReason;
};

export type StopLossOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  triggerCondition: OrderTriggerCondition;
  guaranteed: boolean; // Deprecated
  guaranteedExecutionPremium: DecimalNumber; // Deprecated
  reason: StopLossOrderReason;
  clientExtensions: ClientExtensions;
  orderFillTransactionID: TransactionID;
  replacesOrderID: OrderID;
  cancellingTransactionID: TransactionID;
};

export type StopLossOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID?: ClientID;
  price: PriceValue;
  distance?: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime?: DateTime;
  triggerCondition: OrderTriggerCondition;
  guaranteed?: boolean;
  reason?: StopLossOrderReason;
  clientExtensions?: ClientExtensions;
  orderFillTransactionID?: TransactionID;
  intendedReplacesOrderID?: OrderID;
  rejectReason?: TransactionRejectReason;
};

export type GuaranteedStopLossOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID?: ClientID;
  price: PriceValue;
  distance?: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime?: DateTime;
  triggerCondition: OrderTriggerCondition;
  guaranteedExecutionPremium?: DecimalNumber;
  reason?: GuaranteedStopLossOrderReason;
  clientExtensions?: ClientExtensions;
  orderFillTransactionID?: TransactionID;
  replacesOrderID?: OrderID;
  cancellingTransactionID?: TransactionID;
};

export type GuaranteedStopLossOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID?: ClientID;
  price: PriceValue;
  distance?: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime?: DateTime;
  triggerCondition: OrderTriggerCondition;
  reason?: GuaranteedStopLossOrderReason;
  clientExtensions?: ClientExtensions;
  orderFillTransactionID?: TransactionID;
  intendedReplacesOrderID?: OrderID;
  rejectReason?: TransactionRejectReason;
};

export type TrailingStopLossOrderTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID?: ClientID;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime?: DateTime;
  triggerCondition: OrderTriggerCondition;
  reason?: TrailingStopLossOrderReason;
  clientExtensions?: ClientExtensions;
  orderFillTransactionID?: TransactionID;
  replacesOrderID?: OrderID;
  cancellingTransactionID?: TransactionID;
};

export type TrailingStopLossOrderRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID?: ClientID;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime?: DateTime;
  triggerCondition: OrderTriggerCondition;
  reason?: TrailingStopLossOrderReason;
  clientExtensions?: ClientExtensions;
  orderFillTransactionID?: TransactionID;
  intendedReplacesOrderID?: OrderID;
  rejectReason?: TransactionRejectReason;
};

export type OrderFillTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  orderID: OrderID;
  clientOrderID?: ClientID;
  instrument: InstrumentName;
  units: DecimalNumber;
  gainQuoteHomeConversionFactor?: DecimalNumber;
  lossQuoteHomeConversionFactor?: DecimalNumber;
  homeConversionFactors: HomeConversionFactors;
  price?: PriceValue;
  fullVWAP: PriceValue;
  fullPrice: ClientPrice;
  reason: OrderFillReason;
  pl: AccountUnits;
  quotePL: DecimalNumber;
  financing: AccountUnits;
  baseFinancing: DecimalNumber;
  quoteFinancing: DecimalNumber;
  commission: AccountUnits;
  guaranteedExecutionFee: AccountUnits;
  quoteGuaranteedExecutionFee: DecimalNumber;
  accountBalance: AccountUnits;
  tradeOpened?: TradeOpen;
  tradesClosed?: TradeReduce[];
  tradeReduced?: TradeReduce;
  halfSpreadCost: AccountUnits;
};

export type OrderCancelTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  orderID: OrderID;
  clientOrderID?: OrderID;
  reason: OrderCancelReason;
  replacedByOrderID?: OrderID;
};

export type OrderCancelRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  orderID: OrderID;
  clientOrderID?: OrderID;
  rejectReason: TransactionRejectReason;
};

export type OrderClientExtensionsModifyTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  orderID: OrderID;
  clientOrderID: ClientID;
  clientExtensionsModify: ClientExtensions;
  tradeClientExtensionsModify: ClientExtensions;
};

export type OrderClientExtensionsModifyRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  orderID: OrderID;
  clientOrderID: ClientID;
  clientExtensionsModify: ClientExtensions;
  tradeClientExtensionsModify: ClientExtensions;
  rejectReason: TransactionRejectReason;
};

export type TradeClientExtensionsModifyTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  tradeClientExtensionsModify: ClientExtensions;
};

export type TradeClientExtensionsModifyRejectTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  tradeID: TradeID;
  clientTradeID: ClientID;
  tradeClientExtensionsModify: ClientExtensions;
  rejectReason: TransactionRejectReason;
};

export type MarginCallEnterTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
};

export type MarginCallExtendTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  extensionNumber: number;
};

export type MarginCallExitTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
};

export type DelayedTradeClosureTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  reason: MarketOrderReason;
  tradeIDs: TradeID[];
};

export type DailyFinancingTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  financing: AccountUnits;
  accountBalance: AccountUnits;
  accountFinancingMode?: AccountFinancingMode; // Deprecated field
  positionFinancings: PositionFinancing[];
};

export type DividendAdjustmentTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
  instrument: InstrumentName;
  dividendAdjustment: AccountUnits;
  quoteDividendAdjustment: DecimalNumber;
  homeConversionFactors: HomeConversionFactors;
  accountBalance: AccountUnits;
  openTradeDividendAdjustments: OpenTradeDividendAdjustment[];
};

export type ResetResettablePLTransaction = {
  id: TransactionID;
  time: DateTime;
  userID: number;
  accountID: AccountID;
  batchID: TransactionID;
  requestID: RequestID;
  type: TransactionType;
};

export type ClientTag = string;

export type ClientComment = string;

export type ClientExtensions = {
  id: ClientID;
  tag: ClientTag;
  comment: ClientComment;
};

export type StopLossDetails = {
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
  guaranteed: boolean;
};

export type GuaranteedStopLossDetails = {
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type TrailingStopLossDetails = {
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type TransactionID = `${number}`;

export type TransactionType = 'CREATE' | 'CLOSE' | 'REOPEN' | 'CLIENT_CONFIGURE' | 'CLIENT_CONFIGURE_REJECT' | 'TRANSFER_FUNDS' | 'TRANSFER_FUNDS_REJECT' | 'MARKET_ORDER' | 'MARKET_ORDER_REJECT' | 'FIXED_PRICE_ORDER' | 'LIMIT_ORDER' | 'LIMIT_ORDER_REJECT' | 'STOP_ORDER' | 'STOP_ORDER_REJECT' | 'MARKET_IF_TOUCHED_ORDER' | 'MARKET_IF_TOUCHED_ORDER_REJECT' | 'TAKE_PROFIT_ORDER' | 'TAKE_PROFIT_ORDER_REJECT' | 'STOP_LOSS_ORDER' | 'STOP_LOSS_ORDER_REJECT' | 'GUARANTEED_STOP_LOSS_ORDER' | 'GUARANTEED_STOP_LOSS_ORDER_REJECT' | 'TRAILING_STOP_LOSS_ORDER' | 'TRAILING_STOP_LOSS_ORDER_REJECT' | 'ORDER_FILL' | 'ORDER_CANCEL' | 'ORDER_CANCEL_REJECT' | 'ORDER_CLIENT_EXTENSIONS_MODIFY' | 'ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'TRADE_CLIENT_EXTENSIONS_MODIFY' | 'TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'MARGIN_CALL_ENTER' | 'MARGIN_CALL_EXTEND' | 'MARGIN_CALL_EXIT' | 'DELAYED_TRADE_CLOSURE' | 'DAILY_FINANCING' | 'DIVIDEND_ADJUSTMENT' | 'RESET_RESETTABLE_PL';

export type FundingReason = 'CLIENT_FUNDING' | 'ACCOUNT_TRANSFER' | 'DIVISION_MIGRATION' | 'SITE_MIGRATION' | 'ADJUSTMENT';

export type MarketOrderReason = 'CLIENT_ORDER' | 'TRADE_CLOSE' | 'POSITION_CLOSEOUT' | 'MARGIN_CLOSEOUT' | 'DELAYED_TRADE_CLOSE';

export type FixedPriceOrderReason = 'PLATFORM_ACCOUNT_MIGRATION' | 'TRADE_CLOSE_DIVISION_ACCOUNT_MIGRATION' | 'TRADE_CLOSE_ADMINISTRATIVE_ACTION';

export type LimitOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT';

export type StopOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT';

export type MarketIfTouchedOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT';

export type TakeProfitOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT' | 'ON_FILL';

export type StopLossOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT' | 'ON_FILL';

export type GuaranteedStopLossOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT' | 'ON_FILL';

export type TrailingStopLossOrderReason = 'CLIENT_ORDER' | 'REPLACEMENT' | 'ON_FILL';


export type OrderFillReason = 'LIMIT_ORDER' | 'STOP_ORDER' | 'MARKET_IF_TOUCHED_ORDER' | 'TAKE_PROFIT_ORDER' | 'STOP_LOSS_ORDER' | 'GUARANTEED_STOP_LOSS_ORDER' | 'TRAILING_STOP_LOSS_ORDER' | 'MARKET_ORDER' | 'MARKET_ORDER_TRADE_CLOSE' | 'MARKET_ORDER_POSITION_CLOSEOUT' | 'MARKET_ORDER_MARGIN_CLOSEOUT' | 'MARKET_ORDER_DELAYED_TRADE_CLOSE' | 'FIXED_PRICE_ORDER' | 'FIXED_PRICE_ORDER_PLATFORM_ACCOUNT_MIGRATION' | 'FIXED_PRICE_ORDER_DIVISION_ACCOUNT_MIGRATION' | 'FIXED_PRICE_ORDER_ADMINISTRATIVE_ACTION';

export type OrderCancelReason = 'INTERNAL_SERVER_ERROR' | 'ACCOUNT_LOCKED' | 'ACCOUNT_NEW_POSITIONS_LOCKED' | 'T' | 'ACCOUNT_ORDER_CREATION_LOCKED' | 'ACCOUNT_ORDER_FILL_LOCKED' | 'CLIENT_REQUEST' | 'MIGRATION' | 'MARKET_HALTED' | 'LINKED_TRADE_CLOSED' | 'TIME_IN_FORCE_EXPIRED' | 'INSUFFICIENT_MARGIN' | 'FIFO_VIOLATION' | 'BOUNDS_VIOLATION' | 'CLIENT_REQUEST_REPLACED' | 'DIVIDEND_ADJUSTMENT_REPLACED' | 'INSUFFICIENT_LIQUIDITY' | 'TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'TAKE_PROFIT_ON_FILL_LOSS' | 'LOSING_TAKE_PROFIT' | 'STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'F' | 'STOP_LOSS_ON_FILL_LOSS' | 'STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'STOP_LOSS_ON_FILL_REQUIRED' | 'STOP_LOSS_ON_FILL_GUARANTEED_REQUIRED' | 'STOP_LOSS_ON_FILL_GUARANTEED_NOT_ALLOWED' | 'STOP_LOSS_ON_FILL_GUARANTEED_MINIMUM_DISTANCE_NOT_MET' | 'STOP_LOSS_ON_FILL_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED' | 'STOP_LOSS_ON_FILL_GUARANTEED_HEDGING_NOT_ALLOWED' | 'STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID' | 'STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'GUARANTEED_STOP_LOSS_ON_FILL_LOSS' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED' | 'GUARANTEED_STOP_LOSS_ON_FILL_NOT_ALLOWED' | 'GUARANTEED_STOP_LOSS_ON_FILL_MINIMUM_DISTANCE_NOT_MET' | 'GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_VOLUME_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_HEDGING_NOT_ALLOWED' | 'GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID' | 'TAKE_PROFIT_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'CLIENT_TRADE_ID_ALREADY_EXISTS' | 'POSITION_CLOSEOUT_FAILED' | 'OPEN_TRADES_ALLOWED_EXCEEDED' | 'PENDING_ORDERS_ALLOWED_EXCEEDED' | 'TAKE_PROFIT_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS' | 'STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS' | 'GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS' | 'TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_ALREADY_EXISTS' | 'POSITION_SIZE_EXCEEDED' | 'HEDGING_GSLO_VIOLATION' | 'ACCOUNT_POSITION_VALUE_LIMIT_EXCEEDED' | 'INSTRUMENT_BID_REDUCE_ONLY' | 'INSTRUMENT_ASK_REDUCE_ONLY' | 'INSTRUMENT_BID_HALTED' | 'INSTRUMENT_ASK_HALTED' | 'STOP_LOSS_ON_FILL_GUARANTEED_BID_HALTED' | 'STOP_LOSS_ON_FILL_GUARANTEED_ASK_HALTED' | 'GUARANTEED_STOP_LOSS_ON_FILL_BID_HALTED' | 'GUARANTEED_STOP_LOSS_ON_FILL_ASK_HALTED' | 'FIFO_VIOLATION_SAFEGUARD_VIOLATION' | 'FIFO_VIOLATION_SAFEGUARD_PARTIAL_CLOSE_VIOLATION' | 'ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION';

export type OpenTradeDividendAdjustment = {
  tradeID: TradeID;
  dividendAdjustment: AccountUnits;
  quoteDividendAdjustment: DecimalNumber;
};

export type ClientID = string;

export type ClientTag = string;

export type ClientComment = string;

export type ClientExtensions = {
  id: ClientID;
  tag: ClientTag;
  comment: ClientComment;
};

export type TakeProfitDetails = {
  price: PriceValue;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type StopLossDetails = {
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
  guaranteed: boolean;
};

export type GuaranteedStopLossDetails = {
  price: PriceValue;
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type TrailingStopLossDetails = {
  distance: DecimalNumber;
  timeInForce: TimeInForce;
  gtdTime: DateTime;
  clientExtensions: ClientExtensions;
};

export type TradeOpen = {
  tradeID: TradeID;
  units: DecimalNumber;
  price: PriceValue;
  guaranteedExecutionFee: AccountUnits;
  quoteGuaranteedExecutionFee: DecimalNumber;
  clientExtensions: ClientExtensions;
  halfSpreadCost: AccountUnits;
  initialMarginRequired: AccountUnits;
};

export type TradeReduce = {
  tradeID: TradeID;
  units: DecimalNumber;
  price: PriceValue;
  realizedPL: AccountUnits;
  financing: AccountUnits;
  baseFinancing: DecimalNumber;
  quoteFinancing: DecimalNumber;
  financingRate: DecimalNumber;
  guaranteedExecutionFee: AccountUnits;
  quoteGuaranteedExecutionFee: DecimalNumber;
  halfSpreadCost: AccountUnits;
};

export type MarketOrderTradeClose = {
  tradeID: TradeID;
  clientTradeID: string;
  units: string;
};

export type MarketOrderMarginCloseout = {
  reason: MarketOrderMarginCloseoutReason;
};

export type MarketOrderMarginCloseoutReason = 'MARGIN_CHECK_VIOLATION' | 'REGULATORY_MARGIN_CALL_VIOLATION' | 'REGULATORY_MARGIN_CHECK_VIOLATION';

export type MarketOrderDelayedTradeClose = {
  tradeID: TradeID;
  clientTradeID: TradeID;
  sourceTransactionID: TransactionID;
};

export type MarketOrderPositionCloseout = {
  instrument: InstrumentName;
  units: string;
};

export type LiquidityRegenerationSchedule = {
  steps: LiquidityRegenerationScheduleStep[];
};

export type LiquidityRegenerationScheduleStep = {
  timestamp: DateTime;
  bidLiquidityUsed: DecimalNumber;
  askLiquidityUsed: DecimalNumber;
};

export type OpenTradeFinancing = {
  tradeID: TradeID;
  financing: AccountUnits;
  baseFinancing: DecimalNumber;
  quoteFinancing: DecimalNumber;
  financingRate: DecimalNumber;
};

export type PositionFinancing = {
  instrument: InstrumentName;
  financing: AccountUnits;
  baseFinancing: DecimalNumber;
  quoteFinancing: DecimalNumber;
  homeConversionFactors: HomeConversionFactors;
  openTradeFinancings: OpenTradeFinancing[];
  accountFinancingMode: AccountFinancingMode;
};

export type RequestID = string;

export type ClientRequestID = string;

export type TransactionRejectReason = 'INTERNAL_SERVER_ERROR' | 'INSTRUMENT_PRICE_UNKNOWN' | 'ACCOUNT_NOT_ACTIVE' | 'ACCOUNT_LOCKED' | 'ACCOUNT_ORDER_CREATION_LOCKED' | 'ACCOUNT_CONFIGURATION_LOCKED' | 'ACCOUNT_DEPOSIT_LOCKED' | 'ACCOUNT_WITHDRAWAL_LOCKED' | 'ACCOUNT_ORDER_CANCEL_LOCKED' | 'INSTRUMENT_NOT_TRADEABLE' | 'PENDING_ORDERS_ALLOWED_EXCEEDED' | 'ORDER_ID_UNSPECIFIED' | 'ORDER_DOESNT_EXIST' | 'ORDER_IDENTIFIER_INCONSISTENCY' | 'TRADE_ID_UNSPECIFIED' | 'TRADE_DOESNT_EXIST' | 'TRADE_IDENTIFIER_INCONSISTENCY' | 'INSUFFICIENT_MARGIN' | 'INSTRUMENT_MISSING' | 'INSTRUMENT_UNKNOWN' | 'UNITS_MISSING' | 'UNITS_INVALID' | 'UNITS_PRECISION_EXCEEDED' | 'UNITS_LIMIT_EXCEEDED' | 'UNITS_MINIMUM_NOT_MET' | 'PRICE_MISSING' | 'PRICE_INVALID' | 'PRICE_PRECISION_EXCEEDED' | 'PRICE_DISTANCE_MISSING' | 'PRICE_DISTANCE_INVALID' | 'PRICE_DISTANCE_PRECISION_EXCEEDED' | 'PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'PRICE_DISTANCE_MINIMUM_NOT_MET' | 'TIME_IN_FORCE_MISSING' | 'TIME_IN_FORCE_INVALID' | 'TIME_IN_FORCE_GTD_TIMESTAMP_MISSING' | 'TIME_IN_FORCE_GTD_TIMESTAMP_IN_PAST' | 'PRICE_BOUND_INVALID' | 'PRICE_BOUND_PRECISION_EXCEEDED' | 'ORDERS_ON_FILL_DUPLICATE_CLIENT_ORDER_IDS' | 'TRADE_ON_FILL_CLIENT_EXTENSIONS_NOT_SUPPORTED' | 'CLIENT_ORDER_ID_INVALID' | 'CLIENT_ORDER_ID_ALREADY_EXISTS' | 'CLIENT_ORDER_TAG_INVALID' | 'CLIENT_ORDER_COMMENT_INVALID' | 'CLIENT_TRADE_ID_INVALID' | 'CLIENT_TRADE_ID_ALREADY_EXISTS' | 'CLIENT_TRADE_TAG_INVALID' | 'CLIENT_TRADE_COMMENT_INVALID' | 'ORDER_FILL_POSITION_ACTION_MISSING' | 'ORDER_FILL_POSITION_ACTION_INVALID' | 'TRIGGER_CONDITION_MISSING' | 'TRIGGER_CONDITION_INVALID' | 'ORDER_PARTIAL_FILL_OPTION_MISSING' | 'ORDER_PARTIAL_FILL_OPTION_INVALID' | 'INVALID_REISSUE_IMMEDIATE_PARTIAL_FILL' | 'ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION' | 'ORDERS_ON_FILL_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION' | 'TAKE_PROFIT_ORDER_ALREADY_EXISTS' | 'TAKE_PROFIT_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD' | 'TAKE_PROFIT_ON_FILL_PRICE_MISSING' | 'TAKE_PROFIT_ON_FILL_PRICE_INVALID' | 'TAKE_PROFIT_ON_FILL_PRICE_PRECISION_EXCEEDED' | 'TAKE_PROFIT_ON_FILL_TIME_IN_FORCE_MISSING' | 'TAKE_PROFIT_ON_FILL_TIME_IN_FORCE_INVALID' | 'TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_MISSING' | 'TAKE_PROFIT_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'TAKE_PROFIT_ON_FILL_CLIENT_ORDER_ID_INVALID' | 'TAKE_PROFIT_ON_FILL_CLIENT_ORDER_TAG_INVALID' | 'TAKE_PROFIT_ON_FILL_CLIENT_ORDER_COMMENT_INVALID' | 'TAKE_PROFIT_ON_FILL_TRIGGER_CONDITION_MISSING' | 'TAKE_PROFIT_ON_FILL_TRIGGER_CONDITION_INVALID' | 'STOP_LOSS_ORDER_ALREADY_EXISTS' | 'STOP_LOSS_ORDER_GUARANTEED_REQUIRED' | 'STOP_LOSS_ORDER_GUARANTEED_PRICE_WITHIN_SPREAD' | 'STOP_LOSS_ORDER_GUARANTEED_NOT_ALLOWED' | 'STOP_LOSS_ORDER_GUARANTEED_HALTED_CREATE_VIOLATION' | 'STOP_LOSS_ORDER_GUARANTEED_HALTED_TIGHTEN_VIOLATION' | 'STOP_LOSS_ORDER_GUARANTEED_HEDGING_NOT_ALLOWED' | 'STOP_LOSS_ORDER_GUARANTEED_MINIMUM_DISTANCE_NOT_MET' | 'STOP_LOSS_ORDER_NOT_CANCELABLE' | 'STOP_LOSS_ORDER_NOT_REPLACEABLE' | 'STOP_LOSS_ORDER_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED' | 'STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_SPECIFIED' | 'STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_MISSING' | 'STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD' | 'STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION' | 'STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION' | 'STOP_LOSS_ON_FILL_REQUIRED_FOR_PENDING_ORDER' | 'STOP_LOSS_ON_FILL_GUARANTEED_NOT_ALLOWED' | 'STOP_LOSS_ON_FILL_GUARANTEED_REQUIRED' | 'STOP_LOSS_ON_FILL_PRICE_MISSING' | 'STOP_LOSS_ON_FILL_PRICE_INVALID' | 'STOP_LOSS_ON_FILL_PRICE_PRECISION_EXCEEDED' | 'STOP_LOSS_ON_FILL_GUARANTEED_MINIMUM_DISTANCE_NOT_MET' | 'STOP_LOSS_ON_FILL_GUARANTEED_LEVEL_RESTRICTION_EXCEEDED' | 'STOP_LOSS_ON_FILL_DISTANCE_INVALID' | 'STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'STOP_LOSS_ON_FILL_DISTANCE_PRECISION_EXCEEDED' | 'STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_SPECIFIED' | 'STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_MISSING' | 'STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING' | 'STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID' | 'STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING' | 'STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID' | 'STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID' | 'STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID' | 'STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING' | 'STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID' | 'GUARANTEED_STOP_LOSS_ORDER_ALREADY_EXISTS' | 'GUARANTEED_STOP_LOSS_ORDER_REQUIRED' | 'GUARANTEED_STOP_LOSS_ORDER_PRICE_WITHIN_SPREAD' | 'GUARANTEED_STOP_LOSS_ORDER_NOT_ALLOWED' | 'GUARANTEED_STOP_LOSS_ORDER_HALTED_CREATE_VIOLATION' | 'GUARANTEED_STOP_LOSS_ORDER_CREATE_VIOLATION' | 'GUARANTEED_STOP_LOSS_ORDER_HALTED_TIGHTEN_VIOLATION' | 'GUARANTEED_STOP_LOSS_ORDER_TIGHTEN_VIOLATION' | 'GUARANTEED_STOP_LOSS_ORDER_HEDGING_NOT_ALLOWED' | 'GUARANTEED_STOP_LOSS_ORDER_MINIMUM_DISTANCE_NOT_MET' | 'GUARANTEED_STOP_LOSS_ORDER_NOT_CANCELABLE' | 'GUARANTEED_STOP_LOSS_ORDER_HALTED_NOT_CANCELABLE' | 'GUARANTEED_STOP_LOSS_ORDER_NOT_REPLACEABLE' | 'GUARANTEED_STOP_LOSS_ORDER_HALTED_NOT_REPLACEABLE' | 'GUARANTEED_STOP_LOSS_ORDER_LEVEL_RESTRICTION_VOLUME_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ORDER_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_SPECIFIED' | 'GUARANTEED_STOP_LOSS_ORDER_PRICE_AND_DISTANCE_BOTH_MISSING' | 'GUARANTEED_STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD' | 'GUARANTEED_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION' | 'GUARANTEED_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION' | 'GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED_FOR_PENDING_ORDER' | 'GUARANTEED_STOP_LOSS_ON_FILL_NOT_ALLOWED' | 'GUARANTEED_STOP_LOSS_ON_FILL_REQUIRED' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_MISSING' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_PRECISION_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_MINIMUM_DISTANCE_NOT_MET' | 'GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_VOLUME_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_LEVEL_RESTRICTION_PRICE_RANGE_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_DISTANCE_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_DISTANCE_PRECISION_EXCEEDED' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_SPECIFIED' | 'GUARANTEED_STOP_LOSS_ON_FILL_PRICE_AND_DISTANCE_BOTH_MISSING' | 'GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING' | 'GUARANTEED_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING' | 'GUARANTEED_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID' | 'GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING' | 'GUARANTEED_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID' | 'TRAILING_STOP_LOSS_ORDER_ALREADY_EXISTS' | 'TRAILING_STOP_LOSS_ORDER_WOULD_VIOLATE_FIFO_VIOLATION_SAFEGUARD' | 'TRAILING_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_MUTUALLY_EXCLUSIVE_VIOLATION' | 'TRAILING_STOP_LOSS_ORDER_RMO_MUTUAL_EXCLUSIVITY_GSLO_EXCLUDES_OTHERS_VIOLATION' | 'TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MISSING' | 'TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_INVALID' | 'TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_PRECISION_EXCEEDED' | 'TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MAXIMUM_EXCEEDED' | 'TRAILING_STOP_LOSS_ON_FILL_PRICE_DISTANCE_MINIMUM_NOT_MET' | 'TRAILING_STOP_LOSS_ON_FILL_TIME_IN_FORCE_MISSING' | 'TRAILING_STOP_LOSS_ON_FILL_TIME_IN_FORCE_INVALID' | 'TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_MISSING' | 'TRAILING_STOP_LOSS_ON_FILL_GTD_TIMESTAMP_IN_PAST' | 'TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_ID_INVALID' | 'TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_TAG_INVALID' | 'TRAILING_STOP_LOSS_ON_FILL_CLIENT_ORDER_COMMENT_INVALID' | 'TRAILING_STOP_LOSS_ORDERS_NOT_SUPPORTED' | 'TRAILING_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_MISSING' | 'TRAILING_STOP_LOSS_ON_FILL_TRIGGER_CONDITION_INVALID' | 'CLOSE_TRADE_TYPE_MISSING' | 'CLOSE_TRADE_PARTIAL_UNITS_MISSING' | 'CLOSE_TRADE_UNITS_EXCEED_TRADE_SIZE' | 'CLOSEOUT_POSITION_DOESNT_EXIST' | 'CLOSEOUT_POSITION_INCOMPLETE_SPECIFICATION' | 'CLOSEOUT_POSITION_UNITS_EXCEED_POSITION_SIZE' | 'CLOSEOUT_POSITION_REJECT' | 'CLOSEOUT_POSITION_PARTIAL_UNITS_MISSING' | 'MARKUP_GROUP_ID_INVALID' | 'POSITION_AGGREGATION_MODE_INVALID' | 'ADMIN_CONFIGURE_DATA_MISSING' | 'MARGIN_RATE_INVALID' | 'MARGIN_RATE_WOULD_TRIGGER_CLOSEOUT' | 'ALIAS_INVALID' | 'CLIENT_CONFIGURE_DATA_MISSING' | 'MARGIN_RATE_WOULD_TRIGGER_MARGIN_CALL' | 'AMOUNT_INVALID' | 'INSUFFICIENT_FUNDS' | 'AMOUNT_MISSING' | 'FUNDING_REASON_MISSING' | 'OCA_ORDER_IDS_STOP_LOSS_NOT_ALLOWED' | 'CLIENT_EXTENSIONS_DATA_MISSING' | 'REPLACING_ORDER_INVALID' | 'REPLACING_TRADE_ID_INVALID' | 'ORDER_CANCEL_WOULD_TRIGGER_CLOSEOUT';

export type TransactionFilter = 'ORDER' | 'FUNDING' | 'ADMIN' | 'CREATE' | 'CLOSE' | 'REOPEN' | 'CLIENT_CONFIGURE' | 'CLIENT_CONFIGURE_REJECT' | 'TRANSFER_FUNDS' | 'TRANSFER_FUNDS_REJECT' | 'MARKET_ORDER' | 'MARKET_ORDER_REJECT' | 'LIMIT_ORDER' | 'LIMIT_ORDER_REJECT' | 'STOP_ORDER' | 'STOP_ORDER_REJECT' | 'MARKET_IF_TOUCHED_ORDER' | 'MARKET_IF_TOUCHED_ORDER_REJECT' | 'TAKE_PROFIT_ORDER' | 'TAKE_PROFIT_ORDER_REJECT' | 'STOP_LOSS_ORDER' | 'STOP_LOSS_ORDER_REJECT' | 'GUARANTEED_STOP_LOSS_ORDER' | 'GUARANTEED_STOP_LOSS_ORDER_REJECT' | 'TRAILING_STOP_LOSS_ORDER' | 'TRAILING_STOP_LOSS_ORDER_REJECT' | 'ONE_CANCELS_ALL_ORDER' | 'ONE_CANCELS_ALL_ORDER_REJECT' | 'ONE_CANCELS_ALL_ORDER_TRIGGERED' | 'ORDER_FILL' | 'ORDER_CANCEL' | 'ORDER_CANCEL_REJECT' | 'ORDER_CLIENT_EXTENSIONS_MODIFY' | 'ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'TRADE_CLIENT_EXTENSIONS_MODIFY' | 'TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'MARGIN_CALL_ENTER' | 'MARGIN_CALL_EXTEND' | 'MARGIN_CALL_EXIT' | 'DELAYED_TRADE_CLOSURE' | 'DAILY_FINANCING' | 'RESET_RESETTABLE_PL';

export type TransactionHeartbeat = {
  type: string;
  lastTransactionID: TransactionID;
  time: DateTime;
};