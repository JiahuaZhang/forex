import BigNumber from 'bignumber.js';

export const calc = (start: string, end: string) => {
  const open = BigNumber(start);
  const close = BigNumber(end);
  const difference = close.minus(open);
  const change = difference.dividedBy(open).multipliedBy(100);

  const data1 = [{
    open: open.toNumber(),
    close: close.toNumber(),
    difference: difference.toNumber(),
    change: change.toNumber(),
  }];
  const column1 = [
    {
      title: 'Open',
      dataIndex: 'open',
    },
    {
      title: 'Close',
      dataIndex: 'close',
      render: (value: number) => {
        if (close.isGreaterThanOrEqualTo(open)) {
          return <span un-text='green-6' un-font='bold' >{value}</span>;
        }

        return <span un-text='red-5' un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Difference',
      dataIndex: 'difference',
      render: (value: number) => {
        if (close.isGreaterThanOrEqualTo(open)) {
          return <span un-text='green-6' un-font='bold' >{value}</span>;
        }
        return <span un-text='red-5' un-font='bold' >{value}</span>;
      }
    },
    {
      title: 'Change (%)',
      dataIndex: 'change',
      render: (value: number) => {
        if (close.isGreaterThanOrEqualTo(open)) {
          return <span un-text='green-6' un-font='bold' >{value}</span>;
        }
        return <span un-text='red-5' un-font='bold' >{value}</span>;
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