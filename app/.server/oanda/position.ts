import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { Position } from './type/position';
import { TransactionID } from './type/transaction';

export const getPositions = async ({ accountID }: { accountID: AccountID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/positions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { positions: Position[]; lastTransactionID: TransactionID; };
};