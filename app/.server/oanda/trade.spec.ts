import { test } from 'vitest';
import { closeTrade } from './trade';
import { MarketOrderRequest } from './type/order';
import { createOrder } from './order';
import { Response } from './type/response';

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
