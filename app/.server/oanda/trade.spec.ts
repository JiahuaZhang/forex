import { test } from 'vitest';
import { closeTrade, updateTradeClientExtensions, updateTradeDependentOrder } from './trade';
import { MarketOrderRequest } from './type/order';
import { createOrder } from './order';
import { Response } from './type/response';
import { ClientExtensions, GuaranteedStopLossDetails, StopLossDetails, TakeProfitDetails, TrailingStopLossDetails } from './type/transaction';

const ID = '101-001-27063409-001';

test('close trade', async () => {
  const response = await closeTrade({ accountID: ID, tradeSpecifier: '255' });
  console.log(response);
});

test('close partial trade', async () => {
  // const order: MarketOrderRequest = {
  //   instrument: 'USD_CNH',
  //   units: '100',
  //   timeInForce: 'FOK',
  //   type: 'MARKET',
  //   positionFill: 'DEFAULT'
  // };

  // const orderResponse = await createOrder(ID, order) as Response.Order.Success;
  // console.log(orderResponse.orderFillTransaction.id);

  const closeResponse = await closeTrade({ accountID: ID, tradeSpecifier: '299', units: '5' });
  console.log(closeResponse);
});

test('update client extensions', async () => {
  const clientExtensions: ClientExtensions = {
    comment: 'this is a comment',
    tag: 'comment tag',
    id: 'my-test-id'
  };

  const response = await updateTradeClientExtensions({
    accountID: ID,
    tradeSpecifier: '299',
    clientExtensions
  });
  console.log(response);
});

test('update dependent order', async () => {
  const takeProfit: TakeProfitDetails = {
    price: '7.8',
    timeInForce: 'GTC'
  };
  const trailingStopLoss: TrailingStopLossDetails = {
    distance: '1',
    timeInForce: 'GTC'
  };

  const response = await updateTradeDependentOrder({
    accountID: ID,
    tradeSpecifier: '299',
    takeProfit,
    trailingStopLoss
  });

  console.log(response);
});

test('update dependent order', async () => {
  const stopLoss: StopLossDetails = {
    price: '6.8',
    timeInForce: 'GTC'
  };

  const response = await updateTradeDependentOrder({
    accountID: ID,
    tradeSpecifier: '299',
    takeProfit: null,
    stopLoss
  });

  console.log(response);
});