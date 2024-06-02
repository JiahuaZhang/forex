export type AccountId = `${number}-${number}-${number}-${number}`;

export type OandaAccount = {
  id: AccountId;
  mt4AccountID?: number;
  tags: string[];
};

export type GuaranteedStopLossOrderMutability = 'FIXED' | 'REPLACEABLE' | 'CANCELABLE' | 'PRICE_WIDEN_ONLY';

export type GuaranteedStopLossOrderParameters = {
  mutabilityMarketOpen: GuaranteedStopLossOrderMutability;
  mutabilityMarketHalted: GuaranteedStopLossOrderMutability;
};

export type GuaranteedStopLossOrderMode = 'DISABLED' | 'ALLOWED' | 'REQUIRED';

export type TradeState = 'OPEN' | 'CLOSED' | 'CLOSE_WHEN_TRADEABLE';

export type OrderState = 'PENDING' | 'FILLED' | 'TRIGGERED' | 'CANCELLED';

export type ClientExtensions = {
  id: string;
  tag: string;
  comment: string;
};

export type TradeSummary = {
  id: string;
  instrument: string;
  price: `${number}`;
  openTime: string;
  state: TradeState;
  initialUnits: `${number}`;
  initialMarginRequired: `${number}`;
  currentUnits: `${number}`;
  realizedPL: `${number}`;
  unrealizedPL: `${number}`;
  marginUsed: `${number}`;
  averageClosePrice: `${number}`;
  closingTransactionIDs: `${number}`[];
  financing: `${number}`;
  dividendAdjustment: `${number}`;
  closeTime: string;
  clientExtensions: ClientExtensions;
  takeProfitOrderID: `${number}`;
  stopLossOrderID: `${number}`;
  guaranteedStopLossOrderID: `${number}`;
  trailingStopLossOrderID: `${number}`;
};

export type PositionSide = {
  units: `${number}`;
  averagePrice: `${number}`;
  tradeIDs: `${number}`[];
  pl: `${number}`;
  unrealizedPL: `${number}`;
  resettablePL: `${number}`;
  financing: `${number}`;
  dividendAdjustment: `${number}`;
  guaranteedExecutionFees: `${number}`;
};

export type Position = {
  instrument: string;
  pl: `${number}`;
  unrealizedPL: `${number}`;
  marginUsed: `${number}`;
  resettablePL: `${number}`;
  financing: `${number}`;
  commission: `${number}`;
  dividendAdjustment: `${number}`;
  guaranteedExecutionFees: `${number}`;
  long: PositionSide;
  short: PositionSide;
};

export type Order = {
  id: string;
  createTime: string;
  state: OrderState;
  clientExtensions: ClientExtensions;
};

export type OandaAccountDetails = {
  account: {
    id: AccountId;
    alias: string;
    currency: string;
    createdByUserID: number;
    createdTime: string;
    guaranteedStopLossOrderParameters?: GuaranteedStopLossOrderParameters;
    guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;
    resettablePLTime: string;
    marginRate: `${number}`;
    openTradeCount: number;
    openPositionCount: number;
    pendingOrderCount: number;
    hedgingEnabled: boolean;
    unrealizedPL: `${number}`;
    NAV: `${number}`;
    marginUsed: `${number}`;
    marginAvailable: `${number}`;
    positionValue: `${number}`;
    marginCloseoutUnrealizedPL: `${number}`;
    marginCloseoutNAV: `${number}`;
    marginCloseoutMarginUsed: `${number}`;
    marginCloseoutPercent: `${number}`;
    marginCloseoutPositionValue: `${number}`;
    withdrawalLimit: `${number}`;
    marginCallMarginUsed: `${number}`;
    marginCallPercent: `${number}`;
    balance: `${number}`;
    pl: `${number}`;
    resettablePL: `${number}`;
    financing: `${number}`;
    commission: `${number}`;
    dividendAdjustment: `${number}`;
    guaranteedExecutionFees: `${number}`;
    marginCallEnterTime?: string;
    marginCallExtensionCount: number;
    lastMarginCallExtensionTime?: string;
    lastTransactionID: `${number}`;
    trades: TradeSummary[];
    positions: Position[];
    orders: Order[];
  };
  lastTransactionID: `${number}`;
};

export type OandaAccountSummary = {
  id: AccountId;
  alias: string;
  currency: string;
  createdByUserID: number;
  createdTime: string;
  guaranteedStopLossOrderParameters?: GuaranteedStopLossOrderParameters;
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;
  guaranteedStopLossOrderMutability: GuaranteedStopLossOrderMutability;
  resettablePLTime: string;
  marginRate: `${number}`;
  openTradeCount: number;
  openPositionCount: number;
  pendingOrderCount: number;
  hedgingEnabled: boolean;
  unrealizedPL: `${number}`;
  NAV: `${number}`;
  marginUsed: `${number}`;
  marginAvailable: `${number}`;
  positionValue: `${number}`;
  marginCloseoutUnrealizedPL: `${number}`;
  marginCloseoutNAV: `${number}`;
  marginCloseoutMarginUsed: `${number}`;
  marginCloseoutPercent: `${number}`;
  marginCloseoutPositionValue: `${number}`;
  withdrawalLimit: `${number}`;
  marginCallMarginUsed: `${number}`;
  marginCallPercent: `${number}`;
  balance: `${number}`;
  pl: `${number}`;
  resettablePL: `${number}`;
  financing: `${number}`;
  commission: `${number}`;
  dividendAdjustment: `${number}`;
  guaranteedExecutionFees: `${number}`;
  marginCallEnterTime?: string;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime?: string;
  lastTransactionID: `${number}`;
};

export type InstrumentType = 'CURRENCY' | 'CFD' | 'METAL';

export type InstrumentCommission = {
  commission: `${number}`;
  unitsTraded: `${number}`;
  minimumCommission: `${number}`;
};

export type guaranteedStopLossOrderLevelRestriction = {
  volume: `${number}`;
  priceRange: `${number}`;
};

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type FinancingDayOfWeek = {
  dayofWeek: DayOfWeek;
  daysCharged: number;
};

export type InstrumentFinancing = {
  longRate: `${number}`;
  shortRate: `${number}`;
  financingDaysOfWeek: FinancingDayOfWeek[];
};

export type Tag = {
  type: string;
  name: string;
};

export type OandaInstrument = {
  name: `${string}_${string}`;
  type: InstrumentType;
  displayName: string;
  pipLocation: number;
  displayPrecision: number;
  minimumTradeSize: `${number}`;
  maximumTrailingStopDistance: `${number}`;
  minimumGuaranteedStopLossDistance: `${number}`;
  minimumTrailingStopDistance: `${number}`;
  maximumPositionSize: `${number}`;
  maximumOrderUnits: `${number}`;
  marginRate: `${number}`;
  commission: InstrumentCommission;
  guaranteedStopLossOrderMode: GuaranteedStopLossOrderMode;
  guaranteedStopLossOrderExecutionPremium: `${number}`;
  guaranteedStopLossOrderLevelRestriction: guaranteedStopLossOrderLevelRestriction;
  financing: InstrumentFinancing;
  tags: Tag[];
};

export type TransactionType = 'CREATE' | 'CLOSE' | 'REOPEN' | 'CLIENT_CONFIGURE' | 'CLIENT_CONFIGURE_REJECT' | 'TRANSFER_FUNDS' | 'TRANSFER_FUNDS_REJECT' | 'MARKET_ORDER' | 'MARKET_ORDER_REJECT' | 'FIXED_PRICE_ORDER' | 'LIMIT_ORDER' | 'LIMIT_ORDER_REJECT' | 'STOP_ORDER' | 'STOP_ORDER_REJECT' | 'MARKET_IF_TOUCHED_ORDER' | 'MARKET_IF_TOUCHED_ORDER_REJECT' | 'TAKE_PROFIT_ORDER' | 'TAKE_PROFIT_ORDER_REJECT' | 'STOP_LOSS_ORDER' | 'STOP_LOSS_ORDER_REJECT' | 'GUARANTEED_STOP_LOSS_ORDER' | 'GUARANTEED_STOP_LOSS_ORDER_REJECT' | 'TRAILING_STOP_LOSS_ORDER' | 'TRAILING_STOP_LOSS_ORDER_REJECT' | 'ORDER_FILL' | 'ORDER_CANCEL' | 'ORDER_CANCEL_REJECT' | 'ORDER_CLIENT_EXTENSIONS_MODIFY' | 'ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'TRADE_CLIENT_EXTENSIONS_MODIFY' | 'TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT' | 'MARGIN_CALL_ENTER' | 'MARGIN_CALL_EXTEND' | 'MARGIN_CALL_EXIT' | 'DELAYED_TRADE_CLOSURE' | 'DAILY_FINANCING' | 'DIVIDEND_ADJUSTMENT' | 'RESET_RESETTABLE_PL';

export type ClientConfigureTransaction = {
  id: `${number}`;
  time: string;
  userID: number;
  accountID: AccountId;
  batchID: `${number}`;
  requestID: string;
  type: TransactionType;
  alias: string;
  marginRate: `${number}`;
};

export type DynamicOrderState = {
  id: `${number}`;
  trailingStopValue: `${number}`;
  triggerDistance: `${number}`;
  isTriggerDistanceExact: boolean;
};

export type CalculatedTradeState = {
  id: `${number}`;
  unrealizedPL: `${number}`;
  marginUsed: `${number}`;
};

export type CalculatedPositionState = {
  instrument: `${string}_${string}`;
  netUnrealizedPL: `${number}`;
  longUnrealizedPL: `${number}`;
  shortUnrealizedPL: `${number}`;
  marginUsed: `${number}`;
};

export type AccountChangesState = {
  unrealizedPL: `${number}`;
  NAV: `${number}`;
  marginUsed: `${number}`;
  marginAvailable: `${number}`;
  positionValue: `${number}`;
  marginCloseoutUnrealizedPL: `${number}`;
  marginCloseoutNAV: `${number}`;
  marginCloseoutMarginUsed: `${number}`;
  marginCloseoutPercent: `${number}`;
  marginCloseoutPositionValue: `${number}`;
  withdrawalLimit: `${number}`;
  marginCallMarginUsed: `${number}`;
  marginCallPercent: `${number}`;
  balance: `${number}`;
  pl: `${number}`;
  resettablePL: `${number}`;
  financing: `${number}`;
  commission: `${number}`;
  dividendAdjustment: `${number}`;
  guaranteedExecutionFees: `${number}`;
  marginCallEnterTime: string;
  marginCallExtensionCount: number;
  lastMarginCallExtensionTime: string;
  orders: DynamicOrderState[];
  trades: CalculatedTradeState[];
  positions;
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
