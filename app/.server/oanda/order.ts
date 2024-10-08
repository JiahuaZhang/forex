import { oandaUrl } from './account';
import { AccountID } from '../../lib/oanda/type/account';
import { GuaranteedStopLossOrderRequest, LimitOrderRequest, MarketIfTouchedOrderRequest, MarketOrderRequest, Order, OrderID, OrderSpecifier, OrderStateFilter, StopLossOrderRequest, StopOrderRequest, TakeProfitOrderRequest, TrailingStopLossOrderRequest } from '../../lib/oanda/type/order';
import { AcceptDatetimeFormat, InstrumentName } from '../../lib/oanda/type/primitives';
import { Response } from '../../lib/oanda/type/response';
import { ClientExtensions, ClientRequestID, TransactionID } from '../../lib/oanda/type/transaction';

export const createOrder = async (id: string, order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ order })
  });

  return await response.json() as Response.Order.All;
};

export const getOrders = async ({ accountID, acceptDatetimeFormat, ids, state, instrument, count, beforeID }: { accountID: string; acceptDatetimeFormat?: AcceptDatetimeFormat, ids?: OrderID[], state?: OrderStateFilter, instrument?: InstrumentName, count?: number, beforeID?: OrderID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { orders: Order[]; lastTransactionID: TransactionID; };
};

export const getPendingOrders = async ({ acceptDatetimeFormat, accountID }: { acceptDatetimeFormat?: AcceptDatetimeFormat; accountID: AccountID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/pendingOrders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { orders: Order[]; lastTransactionID: TransactionID; };
};

export const getOrder = async ({ acceptDatetimeFormat, accountID, orderSpecifier }: { acceptDatetimeFormat?: AcceptDatetimeFormat; accountID: AccountID; orderSpecifier: OrderSpecifier; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { order: Order, lastTransactionID: TransactionID; };
};

export const updateOrder = async ({ acceptDatetimeFormat, ClientRequestID, accountID, orderSpecifier, order }: { acceptDatetimeFormat?: AcceptDatetimeFormat; ClientRequestID?: ClientRequestID; accountID: AccountID; orderSpecifier: OrderSpecifier; order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ order })
  });

  return await response.json() as Response.UpdateOrder.All;
};

export const cancelOrder = async ({ accountID, orderSpecifier }: { accountID: AccountID, orderSpecifier: OrderSpecifier; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}/cancel`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
  });
  return await response.json() as Response.CancelOrder.All;
};

export const updateClientExtensions = async ({ accountID, orderSpecifier, clientExtensions }: { accountID: AccountID, orderSpecifier: OrderSpecifier; clientExtensions: ClientExtensions; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}/clientExtensions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ clientExtensions })
  });
  return await response.json() as Response.ClientExtensions.All;
};