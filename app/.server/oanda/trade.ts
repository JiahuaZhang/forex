import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { Trade, TradeID, TradeSpecifier, TradeStateFilter } from './type/trade';
import { MarketOrderRejectTransaction, MarketOrderTransaction, OrderCancelTransaction, OrderFillTransaction, TransactionID } from './type/transaction';

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

namespace Response {
  export namespace Trade {
    export type Success = {
      orderCreateTransaction?: MarketOrderTransaction;
      orderFillTransaction?: OrderFillTransaction;
      orderCancelTransaction?: OrderCancelTransaction;
      relatedTransactionIDs?: TransactionID[];
      lastTransactionID?: TransactionID;
    };
    export type Fail = {
      orderRejectTransaction?: MarketOrderRejectTransaction;
      errorCode?: string;
      errorMessage: string;
    };
    export type NotExist = {
      orderRejectTransaction?: MarketOrderRejectTransaction;
      lastTransactionID?: TransactionID;
      relatedTransactionIDs?: TransactionID[];
      errorCode?: string;
      errorMessage: string;
    };
  }
}

export const closeTrade = async ({ accountID, tradeSpecifier, units = 'ALL' }: { acceptDatetimeFormat?: AcceptDatetimeFormat, accountID: AccountID, tradeSpecifier: TradeSpecifier; units?: `ALL` | `${number}`; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/trades/${tradeSpecifier}/close`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ units })
  });

  return await response.json() as Response.Trade.Success | Response.Trade.Fail | Response.Trade.NotExist;
};