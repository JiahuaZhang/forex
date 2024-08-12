import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import BigNumber from 'bignumber.js';
import { Suspense } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import { getPositionBook } from '~/.server/oanda/instrument';
import { PositionBookBucket } from '~/lib/oanda/type/instrument';
import { InstrumentName } from '~/lib/oanda/type/primitives';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getPositionBook({
    instrument: params.instrument as InstrumentName
  });
};

const getClosest = (buckets: PositionBookBucket[], price: string, range = 50) => {
  const index = buckets.findIndex(bucket => BigNumber(bucket.price).isGreaterThanOrEqualTo(price));
  return buckets.slice(index - range, index + range);
};

const getMostAround = (buckets: PositionBookBucket[], range = 50) => {
  const index = buckets.reduce((maxIndex, current, ind) => {
    const long = BigNumber(current.longCountPercent);
    const short = BigNumber(current.shortCountPercent);

    if (
      (long.isGreaterThan(short)
        && long.isGreaterThan(buckets[maxIndex].longCountPercent)
        && long.isGreaterThan(buckets[maxIndex].shortCountPercent))
      || (short.isGreaterThan(long)
        && short.isGreaterThan(buckets[maxIndex].longCountPercent)
        && short.isGreaterThan(buckets[maxIndex].shortCountPercent))
    ) {
      return ind;
    }
    return maxIndex;
  }, 0);

  return buckets.slice(index - range, index + range);
};

const PositionBook = () => {
  const { positionBook } = useLoaderData<typeof loader>();
  console.log(positionBook);
  const data = getClosest(positionBook.buckets, positionBook.price);
  const aroundData = getMostAround(positionBook.buckets);

  return <div>
    <Descriptions column={2} >
      <Descriptions.Item label='instrument'  >{positionBook.instrument}</Descriptions.Item>
      <Descriptions.Item label='time' >{new Date(positionBook.time).toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label='price' >{positionBook.price}</Descriptions.Item>
      <Descriptions.Item label='bucket width' >{positionBook.bucketWidth}</Descriptions.Item>
    </Descriptions>

    <BarChart data={data} width={1600} height={600} >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey='price' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='longCountPercent' fill="green" activeBar={<Rectangle fill="purple" stroke="blue" />} />
      <Bar dataKey='shortCountPercent' fill="red" activeBar={<Rectangle fill="yellow" stroke="blue" />} />
    </BarChart>

    <BarChart data={aroundData} width={1600} height={600} >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey='price' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='longCountPercent' fill="green" activeBar={<Rectangle fill="purple" stroke="blue" />} />
      <Bar dataKey='shortCountPercent' fill="red" activeBar={<Rectangle fill="yellow" stroke="blue" />} />
    </BarChart>

    <ul>
      <li un-m='b2' >
        <Link to='../candles' relative='path'  >
          Candles
        </Link>
      </li>
      <li>
        <Link to='../order-book' relative='path'  >
          Order Book
        </Link>
      </li>
    </ul>
  </div>;
};

export default () => <Suspense>
  <PositionBook />
</Suspense>;