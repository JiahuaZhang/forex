import dajs from 'dayjs';
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
  // console.log(response.status, response.statusText);

  return await response.json() as ForexSeries;
};

export const getForexIntervalSeries = (pairs: string[], start: string) => {
  const requests = pairs.map(async (pair, index) => {
    const values = await getForexInterval(pair, start);
    console.log('resolved values', values);

    return { pair, values };
  });

  return requests;
  // const responses = await Promise.all(requests);
  // console.log(responses);
  // return responses;

  // return [];
};

const getTimeIntervals = (start: string) => {
  const time = dajs(start);
  // const times: { end: string, interval: Interval; }[] = [
  //   { end: time.add(1, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '1min' },
  //   { end: time.add(2, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '1min' },
  //   { end: time.add(5, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '5min' },
  //   { end: time.add(15, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '15min' },
  //   { end: time.add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '30min' },
  //   { end: time.add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), interval: '1h' },
  //   { end: time.add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'), interval: '2h' },
  //   { end: time.add(4, 'hour').format('YYYY-MM-DD HH:mm:ss'), interval: '4h' },
  //   { end: time.add(6, 'hour').format('YYYY-MM-DD HH:mm:ss'), interval: '2h' },
  // ];
  const times: { end: string, interval: Interval; }[] = [
    { end: time.add(3, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '1min' },
    { end: time.add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'), interval: '5min' },
    { end: time.add(6, 'hour').format('YYYY-MM-DD HH:mm:ss'), interval: '1h' },
  ];

  return times;
};

const getForexInterval = async (symbol = 'eur/usd', start: string) => {
  const times = getTimeIntervals(start);
  const requests = times.map(time => getForexSeries({ symbol, interval: time.interval, start, end: time.end }));
  const responses = await Promise.all(requests);
  console.log(responses);

  return responses.reduce<ForexValue[]>((accumulator, current) => {
    if (!accumulator.length) {
      return current.values;
    }

    current.values.pop();
    return [...current.values, ...accumulator];
  }, []);
};