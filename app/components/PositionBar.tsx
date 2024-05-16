import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

export const PositionBar = ({ low, high, value }: { low: number, high: number, value: number; }) => {
  const [width, setWidth] = useState(50);

  useEffect(() => {
    if (value < low) {
      setWidth(BigNumber(low)
        .minus(value)
        .dividedBy(
          BigNumber(high).minus(low)
        ).multipliedBy(100)
        .toNumber()
      );
    } else if (value > high) {
      setWidth(BigNumber(value)
        .minus(high)
        .dividedBy(
          BigNumber(high).minus(low)
        ).multipliedBy(100)
        .toNumber()
      );
    } else {
      setWidth(BigNumber(value)
        .minus(low)
        .dividedBy(BigNumber(high).minus(low))
        .multipliedBy(100)
        .toNumber()
      );
    }
  }, [low, high, value]);

  if (value < low) {
    return <div un-inline-grid='~' un-grid-flow='col' un-justify='start' un-gap='1' >
      ⚠️{value}
      <div un-min-w='14' un-max-w='200' un-bg='red-5' un-text='white center' style={{ width: width * 4 }} >
        <Tooltip title={`${width}%`} >
          {width.toFixed(2)}%
        </Tooltip>
      </div>
      <span un-text='red-5' >{low}</span>
      <div un-w='100' un-bg='green-6' ></div>
      <span un-text='green-6' >{high}</span>
    </div>;
  }
  if (value > high) {
    return <div un-inline-grid='~' un-grid-flow='col' un-justify='start' un-gap='1' >
      <span un-text='red-5' >{low}</span>
      <div un-w='100' un-bg='red-5' ></div>
      <span un-text='green-6' >{high}</span>
      <div un-min-w='14' un-max-w='200' un-bg='green-6' un-text='white center' style={{ width: width * 4 }} >
        <Tooltip title={`${width}%`} >
          {width.toFixed(2)}%
        </Tooltip>
      </div>
      {value}⚠️
    </div>;
  }

  return <div un-inline-grid='~' un-grid-flow='col' un-justify='start' un-gap='1' >
    <span un-text='red-5' >{low}</span>
    <div un-min-w='8' un-bg='red-5' un-text='white center' style={{ width: width * 10 }} >
      <Tooltip title={`${width}%`} >
        {width.toFixed(2)}%
      </Tooltip>
    </div>
    {value}
    <div un-min-w='8' un-bg='green-6' un-text='white center' style={{ width: (100 - width) * 10 }} >
      <Tooltip title={`${100 - width}%`} >
        {(100 - width).toFixed(2)}%
      </Tooltip>
    </div>
    <span un-text='green-6' >{high}</span>
  </div>;
};

export const PositionStick = ({ open, close, value }: { open: string, close: string, value: string; }) => {
  const start = BigNumber(open);
  const end = BigNumber(close);
  const between = BigNumber(value);

  if (end.isGreaterThanOrEqualTo(start)) {
    return <PositionBar low={start.toNumber()} high={end.toNumber()} value={between.toNumber()} />;
  }

  return <PositionBar low={end.toNumber()} high={start.toNumber()} value={between.toNumber()} />;
};