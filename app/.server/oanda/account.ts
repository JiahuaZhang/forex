import { AccountChanges, AccountChangesState, ClientConfigureTransaction, OandaAccount, OandaAccountDetails, OandaAccountSummary, OandaInstrument } from './type';

const url = 'https://api-fxpractice.oanda.com';
// const url = 'https://api-fxtrade.oanda.com';

const streamUrl = 'https://stream-fxpractice.oanda.com';
// const streamUrl = 'https://stream-fxtrade.oanda.com';

export const getAccounts = async () => {
  const response = await fetch(`${url}/v3/accounts`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as { accounts: OandaAccount[]; };
};

export const getAccount = async (id: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as OandaAccountDetails;
};

export const getAccountSummary = async (id: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}/summary`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    account: OandaAccountSummary;
    lastTransactionID: `${number}`;
  };
};

export const getInstruments = async (id: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}/instruments`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    instruments: OandaInstrument[];
    lastTransactionID: `${number}`;
  };
};

export const patchAccountConfiguration = async (id: string, marginRate: number, alias?: string) => {
  const body = {
    marginRate,
    alias
  };

  const response = await fetch(`${url}/v3/accounts/${id}/configuration`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`, },
    body: JSON.stringify(body)
  });
  return await response.json() as {
    clientConfigureTransaction: ClientConfigureTransaction;
    lastTransactionID: `${number}`;
  };
};

export const getAccountChanges = async (id: string, sinceTransactionID: string) => {
  const response = await fetch(`${url}/v3/accounts/${id}/changes?sinceTransactionID=${sinceTransactionID}`, {
    headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}` }
  });
  return await response.json() as {
    changes: AccountChanges,
    state: AccountChangesState,
    lastTransactionID: `${number}`;
  };
};