import { test } from 'vitest';
import { closeTrade } from './trade';

const ID = '101-001-27063409-001';

test('close trade', async () => {
  const response = await closeTrade({ accountID: ID, tradeSpecifier: '255' });
  console.log(response);
});