export namespace Response {
  export namespace Order {
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
    export type All = Success | Invalid | NotExist;
  };
  export namespace UpdateOrder {
    export type Success = Response.Order.Success & {
      replacingOrderCancelTransaction: OrderCancelTransaction;
    };
    export type Invalid = {
      orderRejectTransaction: Transaction;
      relatedTransactionIDs: TransactionID[];
      lastTransactionID: TransactionID;
      errorCode: string;
      errorMessage: string;
    };
    export type NotExist = Omit<Response.Order.NotExist, 'orderRejectTransaction'> & {
      orderCancelRejectTransaction?: Transaction;
    };
    export type All = Success | Invalid | NotExist;
  };
  export namespace CancelOrder {
    export type Success = Omit<
      Response.Order.Success,
      'orderCreateTransaction' | 'orderFillTransaction' | 'orderReissueTransaction' | 'orderReissueRejectTransaction'
    >;
    export type NotExist = Omit<Response.Order.NotExist, 'orderRejectTransaction'> & {
      orderCancelRejectTransaction: OrderCancelRejectTransaction,
    };
    export type All = Success | NotExist;
  };
  export namespace ClientExtensions {
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
    export type All = Success | Invalid | NotExist;
  };
}