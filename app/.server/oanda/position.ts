import { oandaUrl } from './account';
import { AccountID } from '../../lib/oanda/type/account';
import { Position } from '../../lib/oanda/type/position';
import { InstrumentName } from '../../lib/oanda/type/primitives';
import { Response } from '../../lib/oanda/type/response';
import { ClientExtensions, TransactionID } from '../../lib/oanda/type/transaction';

export const getPositions = async ({ accountID }: { accountID: AccountID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/positions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { positions: Position[]; lastTransactionID: TransactionID; };
};

export const getOpenPositions = async ({ accountID }: { accountID: AccountID; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/openPositions`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { positions: Position[]; lastTransactionID: TransactionID; };
};

export const getInstrumentPosition = async ({ accountID, instrument }: { accountID: AccountID; instrument: InstrumentName; }) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/positions/${instrument}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { position: Position; lastTransactionID: TransactionID; };
};

type Unit = 'ALL' | 'NONE' | `${number}`;
export const closePosition = async ({ accountID, instrument, longUnits = 'NONE', longClientExtensions, shortUnits = 'NONE', shortClientExtensions }: { accountID: AccountID; instrument: InstrumentName; longUnits?: Unit; longClientExtensions?: ClientExtensions; shortUnits?: Unit, shortClientExtensions?: ClientExtensions; }) => {
  console.log({ longUnits, shortUnits, longClientExtensions, shortClientExtensions });

  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/positions/${instrument}/close`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ longUnits, longClientExtensions, shortUnits, shortClientExtensions })
  });

  return await response.json() as Response.Position.All;
};