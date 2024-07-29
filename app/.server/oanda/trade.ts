import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { Response } from './type/response';
import { Trade, TradeID, TradeSpecifier, TradeStateFilter } from './type/trade';
import { ClientExtensions, GuaranteedStopLossDetails, StopLossDetails, TakeProfitDetails, TrailingStopLossDetails, TransactionID } from './type/transaction';

export const getTrades = async ({ accountID }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, ids?: TradeID[], state?: TradeStateFilter; instrument?: InstrumentName; count?: Int16Array, beforeID?: TradeID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { trades: Trade[]; lastTransactionID: TransactionID; };
};

export const getOpenTrades = async ({ accountID }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, ids?: TradeID[], state?: TradeStateFilter; instrument?: InstrumentName; count?: Int16Array, beforeID?: TradeID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/openTrades`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { trades: Trade[]; lastTransactionID: TransactionID; };
};

export const getTrade = async ({ accountID, tradeSpecifier }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, tradeSpecifier: TradeSpecifier; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades/${tradeSpecifier}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { trade: Trade, lastTransactionID: TransactionID; };
};

export const closeTrade = async ({ accountID, tradeSpecifier, units = 'ALL' }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, tradeSpecifier: TradeSpecifier; units?: `ALL` | `${number}`; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades/${tradeSpecifier}/close`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ units })
  });

  return await response.json() as Response.Trade.All;
};

export const updateTradeClientExtensions = async ({ accountID, tradeSpecifier, clientExtensions }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, tradeSpecifier: TradeSpecifier; clientExtensions: ClientExtensions; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades/${tradeSpecifier}/clientExtensions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ clientExtensions })
  });

  return await response.json() as Response.Trade.ClientExtensions.All;
};

export const updateTradeDependentOrder = async (
  { accountID, tradeSpecifier, takeProfit, stopLoss, trailingStopLoss, guaranteedStopLoss }: {
    acceptDatetimeFormat?: AcceptDatetimeFormat,
    accountID: AccountID,
    tradeSpecifier: TradeSpecifier;
    takeProfit?: TakeProfitDetails | null;
    stopLoss?: StopLossDetails | null;
    trailingStopLoss?: TrailingStopLossDetails | null;
    guaranteedStopLoss?: GuaranteedStopLossDetails | null;
  }
) => {
  const orders = [['takeProfit', takeProfit],
  ['stopLoss', stopLoss],
  ['trailingStopLoss', trailingStopLoss],
  ['guaranteedStopLoss', guaranteedStopLoss]].filter(([key, value]) => value !== undefined);

  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades/${tradeSpecifier}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify(Object.fromEntries(orders))
  });

  return await response.json() as Response.Trade.Dependent.ALL;
};
