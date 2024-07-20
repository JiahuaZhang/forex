import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { GuaranteedStopLossOrderRequest, LimitOrderRequest, MarketIfTouchedOrderRequest, MarketOrderRequest, Order, OrderID, OrderSpecifier, OrderStateFilter, StopLossOrderRequest, StopOrderRequest, TakeProfitOrderRequest, TrailingStopLossOrderRequest } from './type/order';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { ClientExtensions, ClientRequestID, OrderCancelRejectTransaction, OrderCancelTransaction, OrderClientExtensionsModifyRejectTransaction, OrderClientExtensionsModifyTransaction, OrderFillTransaction, Transaction, TransactionID } from './type/transaction';

namespace OrderResponse {
  export type Success = {
    orderCreateTransaction: Transaction;
    orderFillTransaction: OrderFillTransaction;
    orderCancelTransaction: OrderCancelTransaction;
    orderReissueTransaction: Transaction;
    orderReissueRejectTransaction: Transaction;
    relatedTransactionIDs: TransactionID[];
    lastTransactionID: TransactionID;

  };
  export type Invalid = {
    orderRejectTransaction: Transaction;
    relatedTransactionIDs: TransactionID[];
    lastTransactionID: TransactionID;
    errorCode: string;
    errorMessage: string;
  };
  export type NotExist = {
    orderRejectTransaction: Transaction;
    relatedTransactionIDs: TransactionID[];
    lastTransactionID: TransactionID;
    errorCode: string;
    errorMessage: string;
  };
}
export const createOrder = async (id: string, order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ order })
  });

  return await response.json() as OrderResponse.Success | OrderResponse.Invalid | OrderResponse.NotExist;
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

namespace UpdateOrderResponse {
  export type Success = OrderResponse.Success & {
    replacingOrderCancelTransaction: OrderCancelTransaction;
  };
  export type Invalid = {
    orderRejectTransaction: Transaction;
    relatedTransactionIDs: TransactionID[];
    lastTransactionID: TransactionID;
    errorCode: string;
    errorMessage: string;
  };
  export type NotExist = Omit<OrderResponse.NotExist, 'orderRejectTransaction'> & {
    orderCancelRejectTransaction?: Transaction;
  };
}
export const updateOrder = async ({ acceptDatetimeFormat, ClientRequestID, accountID, orderSpecifier, order }: { acceptDatetimeFormat?: AcceptDatetimeFormat; ClientRequestID?: ClientRequestID; accountID: AccountID; orderSpecifier: OrderSpecifier; order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ order })
  });

  return await response.json() as UpdateOrderResponse.Success | UpdateOrderResponse.Invalid | UpdateOrderResponse.NotExist;
};

namespace CancelOrderResponse {
  export type Success = Omit<
    OrderResponse.Success,
    'orderCreateTransaction' | 'orderFillTransaction' | 'orderReissueTransaction' | 'orderReissueRejectTransaction'
  >;
  export type NotExist = Omit<OrderResponse.NotExist, 'orderRejectTransaction'> & {
    orderCancelRejectTransaction: OrderCancelRejectTransaction,
  };
}
export const cancelOrder = async ({ accountID, orderSpecifier }: { accountID: AccountID, orderSpecifier: OrderSpecifier; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}/cancel`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
  });
  return await response.json() as CancelOrderResponse.Success | CancelOrderResponse.NotExist;
};

namespace ClientExtensionsResponse {
  export type Success = {
    orderClientExtensionsModifyTransaction: OrderClientExtensionsModifyTransaction,
    lastTransactionID: TransactionID;
    relatedTransactionIDs: TransactionID[];
  };
  export type Invalid = {
    orderClientExtensionsModifyRejectTransaction?: OrderClientExtensionsModifyRejectTransaction;
    lastTransactionID?: TransactionID;
    relatedTransactionIDs?: TransactionID[];
    errorCode?: string;
    errorMessage: string;
  };
  export type NotExist = {
    orderClientExtensionsModifyRejectTransaction: OrderClientExtensionsModifyRejectTransaction;
    lastTransactionID?: TransactionID;
    relatedTransactionIDs?: TransactionID[];
    errorCode?: string;
    errorMessage: string;
  };
}
export const updateClientExtensions = async ({ accountID, orderSpecifier, clientExtensions }: { accountID: AccountID, orderSpecifier: OrderSpecifier; clientExtensions: ClientExtensions; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/orders/${orderSpecifier}/clientExtensions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ clientExtensions })
  });
  return await response.json() as ClientExtensionsResponse.Success | ClientExtensionsResponse.Invalid | ClientExtensionsResponse.NotExist;
};