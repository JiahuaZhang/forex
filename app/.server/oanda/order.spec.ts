import { test } from 'vitest';
import { cancelOrder, createOrder, updateOrder } from './order';
import { LimitOrderRequest, MarketIfTouchedOrder, MarketIfTouchedOrderRequest, MarketOrderRequest, TakeProfitOrder, TakeProfitOrderRequest } from './type/order';

const ID = '101-001-27063409-001';

test('create market buy order', async () => {
  const order: MarketOrderRequest = {
    type: 'MARKET',
    instrument: 'USD_CNH',
    timeInForce: 'FOK',
    positionFill: 'DEFAULT',
    units: '100'
  };

  const response = await createOrder(ID, order);
  console.log(response);
});

// {
//   orderCreateTransaction: {
//     id: '254',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '254',
//     requestID: '97288235618853351',
//     time: '2024-07-09T00:53:39.869553012Z',
//     type: 'MARKET_ORDER',
//     instrument: 'USD_CNH',
//     units: '100',
//     timeInForce: 'FOK',
//     positionFill: 'DEFAULT',
//     reason: 'CLIENT_ORDER'
//   },
//   orderFillTransaction: {
//     id: '255',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '254',
//     requestID: '97288235618853351',
//     time: '2024-07-09T00:53:39.869553012Z',
//     type: 'ORDER_FILL',
//     orderID: '254',
//     instrument: 'USD_CNH',
//     units: '100',
//     requestedUnits: '100',
//     price: '7.28881',
//     pl: '0.0000',
//     quotePL: '0',
//     financing: '0.0000',
//     baseFinancing: '0',
//     commission: '0.0000',
//     accountBalance: '10000.6887',
//     gainQuoteHomeConversionFactor: '0.136521019883',
//     lossQuoteHomeConversionFactor: '0.137893090435',
//     guaranteedExecutionFee: '0.0000',
//     quoteGuaranteedExecutionFee: '0',
//     halfSpreadCost: '0.0076',
//     fullVWAP: '7.28881',
//     reason: 'MARKET_ORDER',
//     tradeOpened: {
//       price: '7.28881',
//       tradeID: '255',
//       units: '100',
//       guaranteedExecutionFee: '0.0000',
//       quoteGuaranteedExecutionFee: '0',
//       halfSpreadCost: '0.0076',
//       initialMarginRequired: '5.0000'
//     },
//     fullPrice: {
//       closeoutBid: '7.28748',
//       closeoutAsk: '7.28903',
//       timestamp: '2024-07-09T00:53:39.503204925Z',
//       bids: [Array],
//       asks: [Array]
//     },
//     homeConversionFactors: {
//       gainQuoteHome: [Object],
//       lossQuoteHome: [Object],
//       gainBaseHome: [Object],
//       lossBaseHome: [Object]
//     }
//   },
//   relatedTransactionIDs: [ '254', '255' ],
//   lastTransactionID: '255'
// }

test('create market sell order', async () => {
  const order: MarketOrderRequest = {
    units: '-100',
    instrument: 'EUR_USD',
    timeInForce: 'FOK',
    type: 'MARKET',
    positionFill: 'DEFAULT'
  };

  const response = await createOrder(ID, order);
  console.log(response);
});

test('create a take profit order @ price with id', async () => {
  const order: TakeProfitOrderRequest = {
    timeInForce: 'GTC',
    price: '7.3',
    type: 'TAKE_PROFIT',
    tradeID: '255'
  };

  const response = await createOrder(ID, order);
  console.log(response);
});

// {
//   orderCreateTransaction: {
//     id: '256',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '256',
//     requestID: '79273838151446910',
//     time: '2024-07-09T00:57:47.706666215Z',
//     type: 'TAKE_PROFIT_ORDER',
//     tradeID: '255',
//     timeInForce: 'GTC',
//     triggerCondition: 'DEFAULT',
//     price: '7.30000',
//     reason: 'CLIENT_ORDER'
//   },
//   relatedTransactionIDs: [ '256' ],
//   lastTransactionID: '256'
// }

test('create limit order with stop lost & take profit', async () => {
  const order: LimitOrderRequest = {
    price: '7.2775',
    stopLossOnFill: {
      timeInForce: 'GTC',
      price: '7.223'
    },
    takeProfitOnFill: {
      price: '7.3'
    },
    timeInForce: 'GTC',
    instrument: 'USD_CNH',
    units: '100',
    type: 'LIMIT',
    positionFill: 'DEFAULT'
  };

  const response = await createOrder(ID, order);
  console.log(response);
});

// {
//   orderCreateTransaction: {
//     id: '257',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '257',
//     requestID: '61259441610228866',
//     time: '2024-07-09T01:05:37.215488011Z',
//     type: 'LIMIT_ORDER',
//     instrument: 'USD_CNH',
//     units: '100',
//     price: '7.27750',
//     timeInForce: 'GTC',
//     triggerCondition: 'DEFAULT',
//     partialFill: 'DEFAULT',
//     positionFill: 'DEFAULT',
//     takeProfitOnFill: { price: '7.30000', timeInForce: 'GTC' },
//     stopLossOnFill: {
//       price: '7.22300',
//       timeInForce: 'GTC',
//       triggerMode: 'TOP_OF_BOOK'
//     },
//     reason: 'CLIENT_ORDER'
//   },
//   relatedTransactionIDs: [ '257' ],
//   lastTransactionID: '257'
// }

test('create market if touched order with client extensions', async () => {
  const order: MarketIfTouchedOrderRequest = {
    price: '1.28575',
    timeInForce: 'GTC',
    instrument: 'GBP_USD',
    units: '-100',
    clientExtensions: {
      comment: 'Cool idea for trading',
      tag: 'strategy-alpha',
      id: 'order 666'
    },
    stopLossOnFill: {
      timeInForce: 'GTC',
      price: '1.3'
    },
    takeProfitOnFill: {
      price: '1.268'
    },
    type: 'MARKET_IF_TOUCHED',
    positionFill: 'DEFAULT',
  };

  const response = await createOrder(ID, order);
  console.log(response);
});

// {
//   orderCreateTransaction: {
//     id: '259',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '259',
//     requestID: '97288592577322352',
//     time: '2024-07-10T00:32:05.665796230Z',
//     type: 'MARKET_IF_TOUCHED_ORDER',
//     instrument: 'GBP_USD',
//     units: '-100',
//     price: '1.28575',
//     timeInForce: 'GTC',
//     triggerCondition: 'DEFAULT',
//     partialFill: 'DEFAULT',
//     positionFill: 'DEFAULT',
//     takeProfitOnFill: { price: '1.26800', timeInForce: 'GTC' },
//     stopLossOnFill: {
//       price: '1.30000',
//       timeInForce: 'GTC',
//       triggerMode: 'TOP_OF_BOOK'
//     },
//     reason: 'CLIENT_ORDER',
//     clientExtensions: {
//       id: 'order 666',
//       tag: 'strategy-alpha',
//       comment: 'Cool idea for trading'
//     }
//   },
//   relatedTransactionIDs: [ '259' ],
//   lastTransactionID: '259'
// }

test('update take profit order', async () => {
  const order: TakeProfitOrderRequest = {
    timeInForce: 'GTC',
    price: '7.3123',
    type: 'TAKE_PROFIT',
    tradeID: '255'
  };

  const response = await updateOrder({
    accountID: ID,
    orderSpecifier: '256',
    order
  });
  console.log(response);
});

// {
//   orderCancelTransaction: {
//     id: '271',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '271',
//     requestID: '79276727735684553',
//     time: '2024-07-17T00:19:58.535720109Z',
//     type: 'ORDER_CANCEL',
//     orderID: '256',
//     replacedByOrderID: '272',
//     reason: 'CLIENT_REQUEST_REPLACED'
//   },
//   orderCreateTransaction: {
//     id: '272',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '271',
//     requestID: '79276727735684553',
//     time: '2024-07-17T00:19:58.535720109Z',
//     type: 'TAKE_PROFIT_ORDER',
//     tradeID: '255',
//     timeInForce: 'GTC',
//     triggerCondition: 'DEFAULT',
//     price: '7.31230',
//     reason: 'REPLACEMENT',
//     replacesOrderID: '256',
//     cancellingTransactionID: '271'
//   },
//   relatedTransactionIDs: [ '271', '272' ],
//   lastTransactionID: '272'
// }

test('update by client id', async () => {
  // const order: LimitOrderRequest = {
  //   price: '7.25',
  //   takeProfitOnFill: {
  //     price: '7.3'
  //   },
  //   timeInForce: 'GTC',
  //   instrument: 'USD_CNH',
  //   units: '100',
  //   type: 'LIMIT',
  //   positionFill: 'DEFAULT',
  //   clientExtensions: {
  //     comment: 'test for client id',
  //     id: 'test',
  //     tag: 'test'
  //   }
  // };

  // const response = await createOrder(ID, order);
  // console.log(response);
  // {
  //   orderCreateTransaction: {
  //     id: '281',
  //     accountID: '101-001-27063409-001',
  //     userID: 27063409,
  //     batchID: '281',
  //     requestID: '61262718930289777',
  //     time: '2024-07-18T02:08:31.223901309Z',
  //     type: 'LIMIT_ORDER',
  //     instrument: 'USD_CNH',
  //     units: '100',
  //     price: '7.25000',
  //     timeInForce: 'GTC',
  //     triggerCondition: 'DEFAULT',
  //     partialFill: 'DEFAULT',
  //     positionFill: 'DEFAULT',
  //     takeProfitOnFill: { price: '7.30000', timeInForce: 'GTC' },
  //     reason: 'CLIENT_ORDER',
  //     clientExtensions: { id: 'test', tag: 'test', comment: 'test for client id' }
  //   },
  //   relatedTransactionIDs: [ '281' ],
  //   lastTransactionID: '281'
  // }

  const newOrder: LimitOrderRequest = {
    price: '7.2',
    takeProfitOnFill: {
      price: '7.3'
    },
    timeInForce: 'GTC',
    instrument: 'USD_CNH',
    units: '100',
    type: 'LIMIT',
    positionFill: 'DEFAULT'
  };

  const response = await updateOrder({ order: newOrder, accountID: ID, orderSpecifier: '@test' });
  console.log(response);

  // {
  //   orderCancelTransaction: {
  //     id: '282',
  //     accountID: '101-001-27063409-001',
  //     userID: 27063409,
  //     batchID: '282',
  //     requestID: '61262719123272931',
  //     time: '2024-07-18T02:09:17.116195317Z',
  //     type: 'ORDER_CANCEL',
  //     orderID: '281',
  //     clientOrderID: 'test',
  //     replacedByOrderID: '283',
  //     reason: 'CLIENT_REQUEST_REPLACED'
  //   },
  //   orderCreateTransaction: {
  //     id: '283',
  //     accountID: '101-001-27063409-001',
  //     userID: 27063409,
  //     batchID: '282',
  //     requestID: '61262719123272931',
  //     time: '2024-07-18T02:09:17.116195317Z',
  //     type: 'LIMIT_ORDER',
  //     instrument: 'USD_CNH',
  //     units: '100',
  //     price: '7.20000',
  //     timeInForce: 'GTC',
  //     triggerCondition: 'DEFAULT',
  //     partialFill: 'DEFAULT',
  //     positionFill: 'DEFAULT',
  //     takeProfitOnFill: { price: '7.30000', timeInForce: 'GTC' },
  //     reason: 'REPLACEMENT',
  //     clientExtensions: { id: 'test', tag: 'test', comment: 'test for client id' },
  //     replacesOrderID: '281'
  //   },
  //   relatedTransactionIDs: [ '282', '283' ],
  //   lastTransactionID: '283'
  // }
});

test('cancel order', async () => {
  const response = await cancelOrder({ accountID: ID, orderSpecifier: '272' });
  console.log(response);
});
// {
//   orderCancelTransaction: {
//     id: '286',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '286',
//     requestID: '115306266200396174',
//     time: '2024-07-19T01:26:13.902588969Z',
//     type: 'ORDER_CANCEL',
//     orderID: '272',
//     reason: 'CLIENT_REQUEST'
//   },
//   relatedTransactionIDs: [ '286' ],
//   lastTransactionID: '286'
// }

test('cancel order by client id', async () => {
  const response = await cancelOrder({ accountID: ID, orderSpecifier: '@test' });
  console.log(response);
});

// {
//   orderCancelTransaction: {
//     id: '285',
//     accountID: '101-001-27063409-001',
//     userID: 27063409,
//     batchID: '285',
//     requestID: '115306266057760886',
//     time: '2024-07-19T01:25:38.985311242Z',
//     type: 'ORDER_CANCEL',
//     orderID: '283',
//     clientOrderID: 'test',
//     reason: 'CLIENT_REQUEST'
//   },
//   relatedTransactionIDs: [ '285' ],
//   lastTransactionID: '285'
// }