import BigNumber from 'bignumber.js';
import { ForexSeries, ForexValue } from './type';

export const range = (data: ForexSeries) => {
  let { values } = data;
  values = values.map(val => ({ ...val, difference: BigNumber(val.high).minus(val.low).toNumber() }));

  const column = [
    {
      title: 'datetime',
      dataIndex: 'datetime',
    },
    {
      title: 'open',
      dataIndex: 'open',
    },
    {
      title: 'high',
      dataIndex: 'high',
      render: (value: string, _: ForexValue, index: number) => {
        if (index === values.length - 1) return value;

        if (BigNumber(value).isGreaterThanOrEqualTo(values[index + 1].high)) {
          return <span un-bg='green-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
        }

        return <span un-bg='red-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
      }
    },
    {
      title: 'low',
      dataIndex: 'low',
      render: (value: string, _: ForexValue, index: number) => {
        if (index === values.length - 1) return value;

        if (BigNumber(value).isLessThanOrEqualTo(values[index + 1].low)) {
          return <span un-bg='red-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
        }

        return <span un-bg='green-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
      }
    },
    {
      title: 'close',
      dataIndex: 'close',
    },
    {
      title: 'Difference',
      dataIndex: 'difference',
      render: (value: string, _: ForexValue, index: number) => {
        if (index === values.length - 1) return value;

        if (BigNumber(value).isGreaterThanOrEqualTo(BigNumber((values[index + 1] as any).difference))) {
          return <span un-bg='green-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
        }

        return <span un-bg='red-4' un-p='2' un-text='white' un-rounded='~' >{value}</span>;
      }
    }
  ];

  let high5 = BigNumber(values[0].high);
  let low5 = BigNumber(values[0].low);
  let index = 0;
  for (; index < 5; index++) {
    if (BigNumber(values[index].high).isGreaterThanOrEqualTo(high5)) {
      high5 = BigNumber(values[index].high);
    }
    if (BigNumber(values[index].low).isLessThanOrEqualTo(low5)) {
      low5 = BigNumber(values[index].low);
    }
  }
  let high10 = high5;
  let low10 = low5;
  for (; index < 10; index++) {
    if (BigNumber(values[index].high).isGreaterThanOrEqualTo(high10)) {
      high10 = BigNumber(values[index].high);
    }
    if (BigNumber(values[index].low).isLessThanOrEqualTo(low10)) {
      low10 = BigNumber(values[index].low);
    }
  }
  let high30 = high10;
  let low30 = low10;
  for (; index < 30; index++) {
    if (BigNumber(values[index].high).isGreaterThanOrEqualTo(high30)) {
      high30 = BigNumber(values[index].high);
    }
    if (BigNumber(values[index].low).isLessThanOrEqualTo(low30)) {
      low30 = BigNumber(values[index].low);
    }
  }

  const rangeData = [
    {
      range: '5 days',
      low: low5.toNumber(),
      high: high5.toNumber(),
      difference: high5.minus(low5).toNumber()
    },
    {
      range: '10 days',
      low: low10.toNumber(),
      high: high10.toNumber(),
      difference: high10.minus(low10).toNumber()
    },
    {
      range: '30 days',
      low: low30.toNumber(),
      high: high30.toNumber(),
      difference: high30.minus(low30).toNumber()
    }
  ];
  const rangeColumn = [
    {
      title: 'Range',
      dataIndex: 'range',
    },
    {
      title: 'Low',
      dataIndex: 'low',
    },
    {
      title: 'High',
      dataIndex: 'high',
    },
    {
      title: 'Difference',
      dataIndex: 'difference'
    }
  ];

  return { column, values, rangeData, rangeColumn };
};