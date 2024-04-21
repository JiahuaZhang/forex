import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { ForexValue } from './type';

dayjs.extend(duration);

export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getTimeDifference = (time1: dayjs.Dayjs, time2: dayjs.Dayjs) => {
  const diff = time2.diff(time1);
  const duration = dayjs.duration(diff);
  return `${duration.hours() > 0 ? `${duration.hours()}h ` : ''} ${duration.minutes() > 0 ? `${duration.minutes()}m ` : ''} ${duration.seconds() > 0 ? `${duration.seconds()}s ` : ''}`;
};

export const firstMinuteAnalysis = (currency: string, symbol: `${string}/${string}`, values: ForexValue[]) => {
  values = [...values].reverse();
  const start = values[0];
  const firstMinute = values[1];

  const isIncreasing = BigNumber(firstMinute.open).isGreaterThan(BigNumber(start.open));
  const state = symbol.startsWith(currency)
    ? (isIncreasing ? 'appreciated' : 'depreciated')
    : (isIncreasing ? 'depreciated' : 'appreciated');

  let firstExtreme = start;
  let extreme_value = BigNumber(start.open);
  if (isIncreasing) {
    for (const value of values) {
      if (BigNumber(value.high).isGreaterThanOrEqualTo(extreme_value)) {
        firstExtreme = value;
        extreme_value = BigNumber(value.high);
      } else {
        break;
      }
    }
  } else {
    for (const value of values) {
      if (BigNumber(value.low).isLessThanOrEqualTo(extreme_value)) {
        firstExtreme = value;
        extreme_value = BigNumber(value.low);
      } else {
        break;
      }
    }
  }
  const extreme_difference = extreme_value.minus(BigNumber(start.open));
  const startTime = dayjs(start.datetime);

  const data = values.map(value => {
    const difference = BigNumber(value.open).minus(BigNumber(start.open));
    const change = difference.dividedBy(BigNumber(start.open)).multipliedBy(100);
    const peak_difference = extreme_value.minus(BigNumber(value.open));
    const progress = (extreme_difference.minus(peak_difference)).dividedBy(extreme_difference).multipliedBy(100);
    const is_first_extreme = firstExtreme.datetime === value.datetime;
    const now = dayjs(value.datetime);

    return {
      ...value,
      difference: difference.toNumber(),
      change: change.toNumber(),
      peak_difference: peak_difference.toNumber(),
      progress: progress.toNumber(),
      is_first_extreme,
      time_difference: getTimeDifference(startTime, now)
    };
  });

  const column = [
    {
      title: 'Datetime',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Time Difference',
      dataIndex: 'time_difference',
      key: 'time_difference',
    },
    {
      title: 'Open',
      dataIndex: 'open',
      key: 'open',
    },
    {
      title: 'High',
      dataIndex: 'high',
      key: 'high',
      render: (value: number) => {
        if (!isIncreasing) {
          return value;
        }
        return BigNumber(value).isGreaterThanOrEqualTo(extreme_value)
          ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value}</span>
          : value;
      }
    },
    {
      title: 'Low',
      dataIndex: 'low',
      key: 'low',
      render: (value: number) => {
        if (isIncreasing) {
          return value;
        }
        return BigNumber(value).isLessThanOrEqualTo(extreme_value)
          ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value}</span>
          : value;
      }
    },
    {
      title: 'Close',
      dataIndex: 'close',
      key: 'close',
    },
    {
      title: 'difference',
      dataIndex: 'difference',
      key: 'difference',
    },
    {
      title: 'change',
      dataIndex: 'change',
      key: 'change',
    },
    {
      title: 'peak_difference',
      dataIndex: 'peak_difference',
      key: 'peak_difference',
    },
    {
      title: 'progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (value: number) => {
        return value >= 90 ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value}</span> : value;
      }
    },
    {
      title: 'is_first_extreme',
      dataIndex: 'is_first_extreme',
      key: 'is_first_extreme',
      render: (value: boolean) => {
        return value ? <span un-bg='green-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >Yes</span> : 'No';
      }
    }
  ];

  return {
    column,
    currency,
    symbol,
    state,
    data,
    extreme_difference: extreme_difference.toNumber()
  };

};

