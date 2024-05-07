import BigNumber from 'bignumber.js';
import { ForexSeries } from './type';

export const trend = (data: ForexSeries) => {
  const open = BigNumber(data.values[0].open);
  const high = BigNumber(data.values[0].high);
  const low = BigNumber(data.values[0].low);
  const close = BigNumber(data.values[0].close);
  const difference = close.minus(open);
  const change = difference.dividedBy(open).multipliedBy(100);
  const is_appreciated = close.isGreaterThanOrEqualTo(open);
  const extreme_difference = is_appreciated ? high.minus(open) : low.minus(open);
  const extreme_change = extreme_difference.dividedBy(open).multipliedBy(100);
  const data1 = [{
    open: open.toNumber(),
    high: high.toNumber(),
    low: low.toNumber(),
    close: close.toNumber(),
    difference: difference.toNumber(),
    change: change.toNumber(),
    is_appreciated,
    extreme_change: extreme_change.toNumber(),
    extreme_difference: extreme_difference.toNumber(),
  }];
  const column1 = [
    {
      title: 'Open',
      dataIndex: 'open',
    },
    {
      title: 'High',
      dataIndex: 'high',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : ''}`}>{value}</span>;
      }
    },
    {
      title: 'Low',
      dataIndex: 'low',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? '' : 'red-5'}`} >{value}</span>;
      }
    },
    {
      title: 'Close',
      dataIndex: 'close',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Difference',
      dataIndex: 'difference',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Change (%)',
      dataIndex: 'change',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Extreme Difference',
      dataIndex: 'extreme_difference',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : 'red-5'}`} >{value}</span>;
      }
    },
    {
      title: 'Extreme Change (%)',
      dataIndex: 'extreme_change',
      render: (value: number) => {
        return <span un-text={`${is_appreciated ? 'green-6' : 'red-5'}`} >{value}</span>;
      }
    }
  ];

  const percents = [30, 40, 50, 55, 60, 65, 68, 70, 72, 75, 78, 80, 85];
  const data2 = percents
    .map(percent => ({
      percent,
      value: difference.dividedBy(BigNumber(percent))
        .multipliedBy(100)
        .plus(open)
        .toNumber()
    }));

  const column2 = [
    {
      title: 'Percent (%)',
      dataIndex: 'percent',
    },
    {
      title: 'Value',
      dataIndex: 'value',
    }
  ];

  return {
    data1,
    column1,
    data2,
    column2
  };
};