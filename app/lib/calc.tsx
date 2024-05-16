import BigNumber from 'bignumber.js';

export const calc = (start: string, end: string) => {
  const open = BigNumber(start);
  const close = BigNumber(end);
  const difference = close.minus(open);
  const change = difference.dividedBy(open).multipliedBy(100);

  const data = [{
    open: open.toNumber(),
    close: close.toNumber(),
    difference: difference.toNumber(),
    change: change.toNumber(),
  }];

  const column = [
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

  return {
    data,
    column
  };

};