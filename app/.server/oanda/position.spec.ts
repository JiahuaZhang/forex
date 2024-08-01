import { test } from 'vitest';
import { closePosition } from './position';

const ID = '101-001-27063409-001';

test('close none', async () => {
  const response = await closePosition({
    accountID: ID,
    instrument: 'USD_CNH',
    longUnits: '5'
  });
  console.log(response);
});