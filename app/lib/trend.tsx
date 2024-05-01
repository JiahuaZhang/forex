import BigNumber from 'bignumber.js';
import { ForexSeries } from './type';

export const trend = (data: ForexSeries) => {
  const start = BigNumber(data.values[1].open);
  const end = BigNumber(data.values[0].open);
  const difference = end.minus(start);
  const change = difference.dividedBy(start).multipliedBy(100);
  const data1 = [{
    start: start.toNumber(),
    end: end.toNumber(),
    difference: difference.toNumber(),
    change: change.toNumber(),
  }];
  const column1 = [
    {
      title: 'Start',
      dataIndex: 'start',
    },
    {
      title: 'End',
      dataIndex: 'end',
      render: (value: number) => {
        return <span un-text={`${end > start ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Difference',
      dataIndex: 'difference',
      render: (value: number) => {
        return <span un-text={`${end > start ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Change (%)',
      dataIndex: 'change',
      render: (value: number) => {
        return <span un-text={`${end > start ? 'green-6' : 'red-5'}`} un-font='bold' >{value}</span>;
      }
    }
  ];

  const percents = [30, 40, 50, 55, 60, 65, 68, 70, 72, 75, 78, 80, 85];
  const data2 = percents
    .map(percent => ({
      percent,
      value: difference.dividedBy(BigNumber(percent))
        .multipliedBy(100)
        .plus(start)
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