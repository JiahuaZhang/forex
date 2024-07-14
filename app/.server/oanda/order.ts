import { oandaUrl } from './account';
import { GuaranteedStopLossOrderRequest, LimitOrderRequest, MarketIfTouchedOrderRequest, MarketOrderRequest, Order, OrderID, OrderStateFilter, StopLossOrderRequest, StopOrderRequest, TakeProfitOrderRequest, TrailingStopLossOrderRequest } from './type/order';
import { AcceptDatetimeFormat, InstrumentName } from './type/primitives';
import { OrderCancelTransaction, OrderFillTransaction, Transaction, TransactionID } from './type/transaction';

type SuccessOrderRespons = {
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

export const createOrder = async (id: string, order: MarketOrderRequest | LimitOrderRequest | StopOrderRequest | MarketIfTouchedOrderRequest | TakeProfitOrderRequest | StopLossOrderRequest | GuaranteedStopLossOrderRequest | TrailingStopLossOrderRequest) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ order })
  });

  return await response.json() as SuccessOrderRespons | InvalidOrderResponse | NotExistOrderResponse;
};

export const getOrders = async ({ id, acceptDatetimeFormat, ids, state, instrument, count, beforeID }: { id: string; acceptDatetimeFormat?: AcceptDatetimeFormat, ids?: OrderID[], state?: OrderStateFilter, instrument?: InstrumentName, count?: number, beforeID?: OrderID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/orders`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { orders: Order[]; lastTransactionID: TransactionID; };
};