import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { DateTime } from './type/primitives';
import { TransactionFilter, TransactionID } from './type/transaction';

export namespace Transaction {
  export type Range = {
    from: DateTime;
    to: DateTime;
    pageSize: number;
    type: TransactionFilter[];
    count: number;
    pages: string[];
    lastTransactionID: TransactionID;
  };
}

export const getTransactions = async ({ accountID }: { accountID: AccountID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/transactions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as Transaction.Range;
};