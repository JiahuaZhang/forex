import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { ForexValue } from './type';
import { Tooltip } from 'antd';

dayjs.extend(duration);

export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getTimeDifference = (time1: dayjs.Dayjs, time2: dayjs.Dayjs) => {
  const diff = time2.diff(time1);
  const duration = dayjs.duration(diff);
  return `${duration.hours() > 0 ? `${duration.hours()}h ` : ''} ${duration.minutes() > 0 ? `${duration.minutes()}m ` : ''}`;
};

export const firstMinuteAnalysis = (currency: string, symbol: `${string}/${string}`, values: ForexValue[]) => {
  values = [...values].reverse();
  const start = values[0];
  const firstMinute = values[1];

  const isIncreasing = BigNumber(firstMinute.open).isGreaterThan(BigNumber(start.open));
  const isAppreciated = symbol.toLowerCase().startsWith(currency.toLowerCase())
    ? (isIncreasing ? true : false)
    : (isIncreasing ? false : true);

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

  let highest = BigNumber(start.open);
  let lowest = BigNumber(start.open);
  for (const value of values) {
    if (BigNumber(value.high).isGreaterThan(highest)) highest = BigNumber(value.high);
    if (BigNumber(value.low).isLessThan(lowest)) lowest = BigNumber(value.low);
  }

  const data = values.map((value, index) => {
    const difference = BigNumber(value.open).minus(BigNumber(start.open));
    const change = difference.dividedBy(BigNumber(start.open)).multipliedBy(100);
    const peak_difference = extreme_value.minus(BigNumber(value.open));
    const progress = (extreme_difference.minus(peak_difference)).dividedBy(extreme_difference).multipliedBy(100);
    const is_first_extreme = firstExtreme.datetime === value.datetime;
    const trend = index === 0 ? '' : BigNumber(value.open).isGreaterThan(BigNumber(values[index - 1].open)) ? 'up' : 'down';
    const is_highest = BigNumber(value.high).isEqualTo(highest);
    const is_lowest = BigNumber(value.low).isEqualTo(lowest);

    return {
      ...value,
      trend,
      difference: difference.toNumber(),
      change: change.toNumber(),
      peak_difference: peak_difference.toNumber(),
      progress: progress.toNumber(),
      is_first_extreme,
      is_highest,
      is_lowest,
      time_difference: getTimeDifference(startTime, dayjs(value.datetime))
    };
  });

  const column = [
    {
      title: 'Datetime',
      dataIndex: 'datetime',
    },
    {
      title: 'Time Difference',
      dataIndex: 'time_difference',
    },
    {
      title: 'Open',
      dataIndex: 'open',
      render: (value: number, item: typeof data[number], index: number) => {
        if (index === 0) {
          return <span un-bg='orange-6' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value}</span>;
        }
        return <span un-text={item.trend === 'up' ? 'green-6' : 'red-6'} >{value}</span>;
      }
    },
    {
      title: 'High',
      dataIndex: 'high',
      render: (value: number, item: typeof data[number]) => {
        if (!isIncreasing) {
          return `${value} ${item.is_highest ? '🔥' : ''}`;
        }
        return BigNumber(value).isGreaterThanOrEqualTo(extreme_value)
          ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~'  >{value} {item.is_highest ? '🔥' : ''}</span>
          : value;
      }
    },
    {
      title: 'Low',
      dataIndex: 'low',
      render: (value: number, item: typeof data[number]) => {
        if (isIncreasing) {
          return `${value} ${item.is_lowest ? '🔥' : ''}`;
        }
        return BigNumber(value).isLessThanOrEqualTo(extreme_value)
          ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value} {item.is_lowest ? '🔥' : ''} </span>
          : value;
      }
    },
    {
      title: 'Close',
      dataIndex: 'close',
    },
    {
      title: 'difference',
      dataIndex: 'difference',
    },
    {
      title: 'change (%)',
      dataIndex: 'change',
      render: (value: number) => {
        const UnoTrick = <span un-bg='red-5 purple-5 blue-5 green-4 orange-4' ></span>;
        let bg = '';
        if (Math.abs(value) >= 0.5) {
          bg = 'red-5';
        } else if (Math.abs(value) >= 0.4) {
          bg = 'purple-5';
        } else if (Math.abs(value) >= 0.3) {
          bg = 'blue-5';
        } else if (Math.abs(value) >= 0.2) {
          bg = 'green-4';
        } else if (Math.abs(value) >= 0.1) {
          bg = 'orange-4';
        } else {
          return <Tooltip title={value} >
            {parseFloat(value.toFixed(4))}
          </Tooltip>;
        }

        return <Tooltip title={value} >
          <span un-text='white' un-p='2' un-py='1' un-rounded='~' un-bg={bg} >
            {parseFloat(value.toFixed(4))}
          </span>
        </Tooltip>;
      }
    },
    {
      title: 'peak_difference',
      dataIndex: 'peak_difference',
    },
    {
      title: 'progress (%)',
      dataIndex: 'progress',
      render: (value: number) => {
        return <Tooltip title={value} >
          {value >= 90
            ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{parseFloat(value.toFixed(4))}</span>
            : parseFloat(value.toFixed(4))}
        </Tooltip>;
      }
    },
    {
      title: 'is_first_extreme',
      dataIndex: 'is_first_extreme',
      render: (value: boolean) => {
        return value ? <span un-bg='green-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >Yes</span> : 'No';
      }
    }
  ];

  return {
    isIncreasing,
    isAppreciated,
    column,
    currency,
    symbol,
    data,
    extreme_difference: extreme_difference.toNumber()
  };

};