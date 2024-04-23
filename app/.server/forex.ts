import { ErrorResponse } from '@remix-run/node';
import dajs from 'dayjs';
import { TIME_FORMAT } from '~/lib/analysis';
import { ExchangeRate, ForexPair, ForexSeries, ForexValue } from '~/lib/type';

type Interval = '1min' | '5min' | '15min' | '30min' | '45min' | '1h' | '2h' | '4h' | '1day' | '1week' | '1month';

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

  return await response.json() as ForexSeries;
};

type ForexSeriesProps = {
  symbol?: string;
  interval?: Interval;
  start: string;
  end: string;
};

export const getForexSeries = async ({ symbol = 'eur/usd', interval = '1min', start, end }: ForexSeriesProps) => {
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&timezone=America/New_York&interval=${interval}&previous_close=true&start_date=${start}&end_date=${end}`;
  const response = await fetch(url, {
    headers: { 'Authorization': `apikey ${process.env.TWELVEDATA_API_KEY ?? ''}` }
  });
  return await response.json() as (ForexSeries | ErrorResponse);
};

export const getForexIntervalSeries = (pairs: string[], start: string) => {
  const requests = pairs.map(async (pair, index) => {
    await new Promise((resolve) => setTimeout(resolve, index * 1000 * 30));
    const values = await getForexInterval(pair, start);
    return { pair, values };
  });

  return requests;
};

const getTimeIntervals = (start: string) => {
  const time = dajs(start);
  const times: { end: string, interval: Interval; }[] = [
    { end: time.add(3, 'minute').format(TIME_FORMAT), interval: '1min' },
    { end: time.add(30, 'minute').format(TIME_FORMAT), interval: '5min' },
    { end: time.add(6, 'hour').format(TIME_FORMAT), interval: '1h' },
  ];

  return times;
};

export const getForexInterval = async (symbol = 'eur/usd', start: string) => {
  const times = getTimeIntervals(start);
  const requests = times.map(time => getForexSeries({ symbol, interval: time.interval, start, end: time.end }));
  const responses = await Promise.all(requests);

  return responses.reduce<ForexValue[]>((accumulator, current) => {
    if (current.status === 'error') {
      console.log(symbol, ' error: ', current);
      return accumulator;
    }

    if (!accumulator.length) {
      return (current as ForexSeries).values;
    }

    (current as ForexSeries).values.pop();
    return [...(current as ForexSeries).values, ...accumulator];
  }, []);
};