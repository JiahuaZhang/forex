import { AccountID } from '../../lib/oanda/type/account';
import { Candlestick, CandlestickGranularity } from '../../lib/oanda/type/instrument';
import { AcceptDatetimeFormat, InstrumentName, PricingComponent } from '../../lib/oanda/type/primitives';
import { oandaUrl } from './account';

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

export const getLatestCandles = async ({ acceptDatetimeFormat, accountID, instrument, granularity = 'H1', pricing = ['M']
}: {
  acceptDatetimeFormat?: AcceptDatetimeFormat;
  accountID: AccountID,
  instrument: InstrumentName,
  granularity?: CandlestickGranularity,
  pricing?: PricingComponent[];
}) => {
  const url = `${oandaUrl}/v3/accounts/${accountID}/candles/latest?instrument=${instrument}${granularity ? `&granularity=${granularity}` : ''}${pricing ? `&pricing=${pricing.join('')}` : ''}`;
  const response = await fetch(url, { headers: { 'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`, }, });

  return await response.json() as {
    instrument: InstrumentName,
    granularity: CandlestickGranularity,
    candles: Candlestick[];
  };
};