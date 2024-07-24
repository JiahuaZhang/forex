import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { Trade, TradeID, TradeSpecifier, TradeStateFilter } from './type/trade';
import { TransactionID } from './type/transaction';

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