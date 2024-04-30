import BigNumber from 'bignumber.js';
import { ForexSeries } from './type';

export const trend = (data: ForexSeries) => {
  const start = BigNumber(data.values[1].open);
  const end = BigNumber(data.values[0].open);
  const difference = end.minus(start);
  const change = difference.dividedBy(start).multipliedBy(100);

  const percents = [30, 40, 50, 55, 60, 65, 68, 70, 72, 75, 78, 80, 85];
  const values = percents
    .map(percent => ({
      percent,
      value: difference.dividedBy(BigNumber(percent))
        .multipliedBy(100)
        .plus(start)
        .toNumber()
    }));

  const column = [
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
    start: start.toNumber(),
    end: end.toNumber(),
    difference: difference.toNumber(),
    change: change.toNumber(),
    values,
    column
  };
};