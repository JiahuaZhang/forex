import { ExchangeRate, ForexPair } from '~/lib/type';

export const getForexPairs = async () => {
  const url = `https://api.twelvedata.com/forex_pairs`;
  const response = await fetch(url);
  return await response.json() as { data: ForexPair[], status: string; };
};

export const getExchangeRate = async (symbol = 'usd/jpy') => {
  const url = `https://api.twelvedata.com/exchange_rate?symbol=${symbol}&timezone=America/New_York`;
  const response = await fetch(url, {
    headers: { 'Authorization': `apikey ${process.env.TWELVEDATA_API_KEY ?? ''}` }
  });

  return await response.json() as ExchangeRate;
};

export const get1dayForexSeries = async (symbol = 'eur/usd', interval = '1day') => {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&timezone=America/New_York&interval=1day&previous_close=true`;
  const response = await fetch(url, {
    headers: { 'Authorization': `apikey ${process.env.TWELVEDATA_API_KEY ?? ''}` }
  });

  return await response.json() as ExchangeRate;
};