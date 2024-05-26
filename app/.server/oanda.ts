const url = 'https://api-fxpractice.oanda.com';
// const url = 'https://api-fxtrade.oanda.com';

const streamUrl = 'https://stream-fxpractice.oanda.com';
// const streamUrl = 'https://stream-fxtrade.oanda.com';

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

export const getAccounts = async () => {
  const response = await fetch(`${url}/v3/accounts`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as { accounts: OandaAccount[]; };
};

export const getAccount = async (id: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as OandaAccountDetails;
};

export const getAccountSummary = async (id: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}/summary`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    account: OandaAccountSummary;
    lastTransactionID: `${number}`;
  };
};