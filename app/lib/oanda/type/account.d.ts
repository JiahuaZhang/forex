import { DynamicOrderState, Order } from './order';
import { CalculatedPositionState, Position } from './position';
import { AccountUnits, Currency, DateTime, DecimalNumber } from './primitives';
import { CalculatedTradeState, TradeSummary } from './trade';
import { TransactionID } from './transaction';

export type AccountID = `${number}-${number}-${number}-${number}`;

export type Account = {
  id: AccountID;
  alias: string;
  currency: Currency;
  createdByUserID: number;
  createdTime: DateTime;
  guaranteedStopLossOrderParameters?: GuaranteedStopLossOrderParameters;
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;
  guaranteedStopLossOrderMutability: GuaranteedStopLossOrderMutability;
  resettablePLTime: DateTime;
  marginRate: DecimalNumber;
  openTradeCount: number;
  openPositionCount: number;
  pendingOrderCount: number;
  hedgingEnabled: boolean;
  unrealizedPL: AccountUnits;
  NAV: AccountUnits;
  marginUsed: AccountUnits;
  marginAvailable: AccountUnits;
  positionValue: AccountUnits;
  marginCloseoutUnrealizedPL: AccountUnits;
  marginCloseoutNAV: AccountUnits;
  marginCloseoutMarginUsed: AccountUnits;
  marginCloseoutPercent: DecimalNumber;
  marginCloseoutPositionValue: DecimalNumber;
  withdrawalLimit: AccountUnits;
  marginCallMarginUsed: AccountUnits;
  marginCallPercent: DecimalNumber;
  balance: AccountUnits;
  pl: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  commission: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
  marginCallEnterTime: DateTime;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime: DateTime;
  lastTransactionID: TransactionID;
  trades: TradeSummary[];
  positions: Position[];
  orders: Order[];
};

export type AccountChangesState = {
  unrealizedPL: AccountUnits;
  NAV: AccountUnits;
  marginUsed: AccountUnits;
  marginAvailable: AccountUnits;
  positionValue: AccountUnits;
  marginCloseoutUnrealizedPL: AccountUnits;
  marginCloseoutNAV: AccountUnits;
  marginCloseoutMarginUsed: AccountUnits;
  marginCloseoutPercent: DecimalNumber;
  marginCloseoutPositionValue: DecimalNumber;
  withdrawalLimit: AccountUnits;
  marginCallMarginUsed: AccountUnits;
  marginCallPercent: DecimalNumber;
  balance: AccountUnits;
  pl: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  commission: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
  marginCallEnterTime: DateTime;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime: DateTime;
  orders: DynamicOrderState[];
  trades: CalculatedTradeState[];
  positions: CalculatedPositionState[];
};

export type AccountProperties = {
  id: AccountID;
  mt4AccountID: number;
  tags: string[];
};

export type GuaranteedStopLossOrderParameters = {
  mutabilityMarketOpen: GuaranteedStopLossOrderMutability;
  mutabilityMarketHalted: GuaranteedStopLossOrderMutability;
};

export type GuaranteedStopLossOrderMode = 'DISABLED' | 'ALLOWED' | 'REQUIRED';

export type GuaranteedStopLossOrderMutability = 'FIXED' | 'REPLACEABLE' | 'CANCELABLE' | 'PRICE_WIDEN_ONLY';

export type AccountSummary = {
  id: AccountID;
  alias: string;
  currency: Currency;
  createdByUserID: number;
  createdTime: DateTime;
  guaranteedStopLossOrderParameters: GuaranteedStopLossOrderParameters;
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;
  guaranteedStopLossOrderMutability: GuaranteedStopLossOrderMutability;
  resettablePLTime: DateTime;
  marginRate: DecimalNumber;
  openTradeCount: number;
  openPositionCount: number;
  pendingOrderCount: number;
  hedgingEnabled: boolean;
  unrealizedPL: AccountUnits;
  NAV: AccountUnits;
  marginUsed: AccountUnits;
  marginAvailable: AccountUnits;
  positionValue: AccountUnits;
  marginCloseoutUnrealizedPL: AccountUnits;
  marginCloseoutNAV: AccountUnits;
  marginCloseoutMarginUsed: AccountUnits;
  marginCloseoutPercent: DecimalNumber;
  marginCloseoutPositionValue: DecimalNumber;
  withdrawalLimit: AccountUnits;
  marginCallMarginUsed: AccountUnits;
  marginCallPercent: DecimalNumber;
  balance: AccountUnits;
  pl: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  commission: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
  marginCallEnterTime: DateTime;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime: DateTime;
  lastTransactionID: TransactionID;
};

export type AccumulatedAccountState = {
  balance: AccountUnits;
  pl: AccountUnits;
  resettablePL: AccountUnits;
  financing: AccountUnits;
  commission: AccountUnits;
  dividendAdjustment: AccountUnits;
  guaranteedExecutionFees: AccountUnits;
  marginCallEnterTime: DateTime;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime: DateTime;
};

export type CalculatedAccountState = {
  unrealizedPL: AccountUnits;
  NAV: AccountUnits;
  marginUsed: AccountUnits;
  marginAvailable: AccountUnits;
  positionValue: AccountUnits;
  marginCloseoutUnrealizedPL: AccountUnits;
  marginCloseoutNAV: AccountUnits;
  marginCloseoutMarginUsed: AccountUnits;
  marginCloseoutPercent: DecimalNumber;
  marginCloseoutPositionValue: DecimalNumber;
  withdrawalLimit: AccountUnits;
  marginCallMarginUsed: AccountUnits;
  marginCallPercent: DecimalNumber;
};

export type AccountChanges = {
  ordersCreated: Order[];
  ordersCanceled: Order[];
  ordersFilled: Order[];
  ordersTriggered: Order[];
  tradesOpened: TradeSummary[];
  tradesReduced: TradeSummary[];
  tradesClosed: TradeSummary[];
  positions: Position[];
  transactions: Transaction[];
};

export type AccountFinancingMode = 'NO_FINANCING' | 'SECOND_BY_SECOND' | 'DAILY';

export type UserAttributes = {
  userID: number;
  username: string;
  title: string;
  name: string;
  email: string;
  divisionAbbreviation: string;
  languageAbbreviation: string;
  homeCurrency: Currency;
};

export type PositionAggregationMode = 'ABSOLUTE_SUM' | 'MAXIMAL_SIDE' | 'NET_SUM';