import { oandaUrl } from './account';
import { AccountID } from '../../lib/oanda/type/account';
import { CandlestickGranularity, CandlestickResponse, WeeklyAlignment } from '../../lib/oanda/type/instrument';
import { AcceptDatetimeFormat, DecimalNumber, InstrumentName, PricingComponent } from '../../lib/oanda/type/primitives';

export type CandleSpecification = `${InstrumentName}:${CandlestickGranularity}:${PricingComponent}`;

export const getLatestCandles = async ({
  acceptDatetimeFormat, accountID, candleSpecification, units = '1', smooth = false, dailyAlignment = 17, alignmentTimezone = 'America/New_York', weeklyAlignment = 'FRIDAY'
}: {
  acceptDatetimeFormat?: AcceptDatetimeFormat;
  accountID: AccountID,
  candleSpecification: CandleSpecification;
  units?: DecimalNumber;
  smooth?: boolean;
  dailyAlignment?: number;
  alignmentTimezone?: string;
  weeklyAlignment: WeeklyAlignment;
}) => {
  const response = await fetch(`${oandaUrl}/v3/accounts/${accountID}/candels/latest?candleSpecification=${candleSpecification}${units ? `&units=${units}` : ''}${smooth ? `&smooth=${smooth}` : ''}${dailyAlignment ? `&dailyAlignment=${dailyAlignment}` : ''}${alignmentTimezone ? `&alignmentTimezone=${alignmentTimezone}` : ''}${weeklyAlignment ? `&weeklyAlignment=${weeklyAlignment}` : ''}`, {
    headers: {
      'Authorization': `Bearer ${process.env.OANDA_API_KEY ?? ''}`,
    },
  });

  return await response.json() as { latestCandles: CandlestickResponse[]; };
};