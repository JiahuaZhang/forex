import { test } from 'vitest';
import { createOrder } from './order';
import { LimitOrderRequest, MarketIfTouchedOrder, MarketIfTouchedOrderRequest, MarketOrderRequest, TakeProfitOrderRequest } from './type/order';

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
