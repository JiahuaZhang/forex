import { oandaUrl } from './account';
import { AccountID } from './type/account';
import { AcceptDatetimeFormat, DateTime } from './type/primitives';
import { Response } from './type/response';
import { Transaction, TransactionFilter, TransactionID } from './type/transaction';

export const getTransactions = async ({ accountID }: { accountID: AccountID; acceptDatetimeFormat?: AcceptDatetimeFormat, from?: DateTime, to?: DateTime, pageSize?: number, type?: TransactionFilter[]; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/transactions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as Response.Transaction.Range;
};

export const getTransaction = async ({ accountID, transactionID }: { accountID: AccountID; acceptDatetimeFormat?: AcceptDatetimeFormat; transactionID: TransactionID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/transactions/${transactionID}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { transaction: Transaction; lastTransactionID: TransactionID; };
};

export const getTransactionsRange = async ({ accountID, from, to, type }: { accountID: AccountID; acceptDatetimeFormat?: AcceptDatetimeFormat; from: TransactionID; to: TransactionID; type?: TransactionFilter[]; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/transactions/idrange?from=${from}&to=${to}${type ? `&type=${type}` : ''}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { transactions: Transaction[]; lastTransactionID: TransactionID; };
};