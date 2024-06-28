import { Oanda } from './type/type';

export const oandaUrl = 'https://api-fxpractice.oanda.com';
// const url = 'https://api-fxtrade.oanda.com';

const oandaStreamUrl = 'https://stream-fxpractice.oanda.com';
// const streamUrl = 'https://stream-fxtrade.oanda.com';

export const getAccounts = async () => {
  const response = await fetch(`${oandaUrl}/v3/accounts`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as { accounts: Oanda.AccountProperties[]; };
};

export const getAccount = async (id: string) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as { account: Oanda.Account; lastTransactionID: Oanda.TransactionID; };
};

export const getAccountSummary = async (id: string) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/summary`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    account: Oanda.AccountSummary;
    lastTransactionID: Oanda.TransactionID;
  };
};

export const getInstruments = async (id: string) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/instruments`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    instruments: Oanda.Instrument[];
    lastTransactionID: Oanda.TransactionID;
  };
};

export const patchAccountConfiguration = async (id: string, marginRate: number, alias?: string) => {
  const body = {
    marginRate,
    alias
  };

  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/configuration`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`, },
    body: JSON.stringify(body)
  });
  return await response.json() as {
    clientConfigureTransaction: Oanda.ClientConfigureTransaction;
    lastTransactionID: Oanda.TransactionID;
  };
};

export const getAccountChanges = async (id: string, sinceTransactionID: string) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${id}/changes?sinceTransactionID=${sinceTransactionID}`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    changes: Oanda.AccountChanges,
    state: Oanda.AccountChangesState,
    lastTransactionID: Oanda.TransactionID;
  };
};