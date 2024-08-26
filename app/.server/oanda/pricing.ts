import { eventStream } from 'remix-utils/sse/server';
import { interval } from 'remix-utils/timers';
import { ClientPrice, HomeConversions } from '~/lib/oanda/type/pricing';
import { AccountID } from '../../lib/oanda/type/account';
import { Candlestick, CandlestickGranularity } from '../../lib/oanda/type/instrument';
import { AcceptDatetimeFormat, DateTime, InstrumentName, PricingComponent } from '../../lib/oanda/type/primitives';
import { oandaStreamUrl, oandaUrl } from './account';

// type PossiblePricingComponent = `${PricingComponent}` | `${PricingComponent}${PricingComponent}` | `${PricingComponent}${PricingComponent}${PricingComponent}`;
// export type CandleSpecification = `${InstrumentName}:${CandlestickGranularity}:${PossiblePricingComponent}`;

// this would match the documentation on https://developer.oanda.com/rest-live-v20/pricing-ep/
// but it's not working :()
// export const getLatestCandles = async ({
//   acceptDatetimeFormat, accountID, candleSpecification, units = '1', smooth = false, dailyAlignment = 17, alignmentTimezone = 'America/New_York', weeklyAlignment = 'FRIDAY'
// }: {
//   acceptDatetimeFormat?: AcceptDatetimeFormat;
//   accountID: AccountID,
//   candleSpecification: CandleSpecification;
//   units?: DecimalNumber;
//   smooth?: boolean;
//   dailyAlignment?: number;
//   alignmentTimezone?: string;
//   weeklyAlignment?: WeeklyAlignment;
// }) => {
//   const url = `${oandaUrl}/v3/accounts/${accountID}/candles/latest?candleSpecification=${candleSpecification}${units ? `&units=${units}` : ''}${smooth ? `&smooth=${smooth}` : ''}${dailyAlignment ? `&dailyAlignment=${dailyAlignment}` : ''}${alignmentTimezone ? `&alignmentTimezone=${alignmentTimezone}` : ''}${weeklyAlignment ? `&weeklyAlignment=${weeklyAlignment}` : ''}`;
//   console.log(url);

//   const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/candles/latest?candleSpecification=${candleSpecification}${units ? `&units=${units}` : ''}${smooth ? `&smooth=${smooth}` : ''}${dailyAlignment ? `&dailyAlignment=${dailyAlignment}` : ''}${alignmentTimezone ? `&alignmentTimezone=${alignmentTimezone}` : ''}${weeklyAlignment ? `&weeklyAlignment=${weeklyAlignment}` : ''}`, {
//     headers: {
//       'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
//     },
//   });

//   return await response.json() as { latestCandles: CandlestickResponse[]; };
// };

export const getLatestCandles = async ({ acceptDatetimeFormat = 'UNIX', accountID, instrument, granularity = 'H1', price = ['M']
}: {
  acceptDatetimeFormat?: AcceptDatetimeFormat;
  accountID: AccountID,
  instrument: InstrumentName,
  granularity?: CandlestickGranularity,
  price?: PricingComponent[];
}) => {
  const url = `${oandaUrl}/v3/accounts/${accountID}/candles/latest?instrument=${instrument}${granularity ? `&granularity=${granularity}` : ''}${price ? `&price=${price.join('')}` : ''}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
      'Accept-Datetime-Format': acceptDatetimeFormat!
    },
  });

  return await response.json() as {
    instrument: InstrumentName,
    granularity: CandlestickGranularity,
    candles: Candlestick[];
  };
};

export const getPricing = async ({ accountID, instruments, }: {
  acceptDatetimeFormat?: AcceptDatetimeFormat;
  accountID: AccountID,
  instruments: InstrumentName[];
  since?: DateTime;
  includeUnitsAvailable?: boolean;
  includeHomeConversions?: boolean;
}) => {
  const url = `${oandaUrl}/v3/accounts/${accountID}/pricing?instruments=${instruments.join(',')}`;
  console.log({ url });
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { prices: ClientPrice[]; homeConversions?: HomeConversions[], time: DateTime; };
};

export const getPricingStream = ({ signal, accountID, instruments }:
  {
    signal: AbortSignal;
    acceptDatetimeFormat?: AcceptDatetimeFormat;
    accountID: AccountID;
    instruments: InstrumentName[],
    snapshot?: boolean,
    includeHomeConversions?: boolean;
  }) => eventStream(signal, send => {
    const run = async () => {
      const response = await fetch(`${oandaStreamUrl}/v3/accounts/${accountID}/pricing/stream?instruments=${instruments.join(',')}`,
        { headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY}` }, signal });

      if (!response.ok) {
        const errorResponse = await response.json();
        send({ event: `${accountID}-pricing-stream`, data: JSON.stringify(errorResponse) });
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      for await (let _ of interval(1000, { signal })) {
        // https://github.com/remix-run/remix/discussions/8461
        console.log('handling sse on server side, be casual on vite dev mode');
        const { done, value } = await reader.read();
        if (done) return;

        const chunk = decoder.decode(value, { stream: true });
        const prices = chunk.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));
        prices.forEach(transaction => send({ event: `${accountID}-pricing-stream`, data: JSON.stringify(transaction) }));
      }

    };

    run();
    return () => {};
  });