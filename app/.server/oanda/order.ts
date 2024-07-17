import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { GuaranteedStopLossOrderRequest, LimitOrderRequest, MarketIfTouchedOrderRequest, MarketOrderRequest, Order, OrderID, OrderSpecifier, OrderStateFilter, StopLossOrderRequest, StopOrderRequest, TakeProfitOrderRequest, TrailingStopLossOrderRequest } from './type/order';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { ClientRequestID, OrderCancelTransaction, OrderFillTransaction, Transaction, TransactionID } from './type/transaction';

type SuccessOrderResponse = {
  orderCreateTransaction: Transaction;
  orderFillTransaction: OrderFillTransaction;
  orderCancelTransaction: OrderCancelTransaction;
  orderReissueTransaction: Transaction;
  orderReissueRejectTransaction: Transaction;
  relatedTransactionIDs: TransactionID[];
  lastTransactionID: TransactionID;
};

type InvalidOrderResponse = {
  orderRejectTransaction: Transaction;
  relatedTransactionIDs: TransactionID[];
  lastTransactionID: TransactionID;
  errorCode: string;
  errorMessage: string;
};

type NotExistOrderResponse = {
  orderRejectTransaction: Transaction;
  relatedTransactionIDs: TransactionID[];
  lastTransactionID: TransactionID;
  errorCode: string;
  errorMessage: string;
};

type SuccessReplaceOrderResponse = SuccessOrderResponse & {
  replacingOrderCancelTransaction: OrderCancelTransaction;
};

type NotExistAccountOrOrder = {
  orderCancelRejectTransaction?: Transaction;
  relatedTransactionIDs?: TransactionID[];
  lastTransactionID?: TransactionID;
  errorCode?: string;
  errorMessage: string;
};

export const createOrder = async (id: string, order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ order })
  });

  return await response.json() as SuccessOrderResponse | InvalidOrderResponse | NotExistOrderResponse;
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

  return await response.json() as SuccessReplaceOrderResponse | InvalidOrderResponse | NotExistAccountOrOrder;
};