import { eventStream } from 'remix-utils/sse/server';
import { interval } from 'remix-utils/timers';
import { oandaStreamUrl, oandaUrl } from './account';
import { AccountID } from '../../lib/oanda/type/account';
import { AcceptDatetimeFormat, DateTime } from '../../lib/oanda/type/primitives';
import { Response } from '../../lib/oanda/type/response';
import { Transaction, TransactionFilter, TransactionID } from '../../lib/oanda/type/transaction';

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

export const getTransactionsSince = async ({ accountID, type, id }: { accountID: AccountID; acceptDatetimeFormat?: AcceptDatetimeFormat; id: TransactionID; type?: TransactionFilter[]; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/transactions/sinceid?id=${id}${type ? `&type=${type}` : ''}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { transactions: Transaction[]; lastTransactionID: TransactionID; };
};

export const getTransactionsStreamData = (accountID: AccountID, signal: AbortSignal) =>
  eventStream(signal, send => {
    let reader: undefined | ReadableStreamDefaultReader<Uint8Array>;
    const run = async () => {
      const response = await fetch(`${oandaStreamUrl}/v3/accounts/${accountID}/transactions/stream`,
        { headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY}` }, signal });

      if (!response.ok) {
        const errorResponse = await response.json();
        send({ event: `${accountID}-transaction-stream`, data: JSON.stringify(errorResponse) });
        return;
      }

      reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      for await (let _ of interval(1000, { signal })) {
        // https://github.com/remix-run/remix/discussions/8461
        console.log('handling sse on server side, be casual on vite dev mode');
        const { done, value } = await reader.read();
        if (done) return;

        const chunk = decoder.decode(value, { stream: true });
        const transactions = chunk.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));
        transactions.forEach(transaction => send({ event: `${accountID}-transaction-stream`, data: JSON.stringify(transaction) }));
      }
    };

    run();
    return () => reader?.cancel();
  });