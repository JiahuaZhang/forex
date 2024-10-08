import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import BigNumber from 'bignumber.js';
import { Suspense } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import { getOrderBook } from '~/.server/oanda/instrument';
import { OrderBookBucket } from '~/lib/oanda/type/instrument';
import { InstrumentName } from '~/lib/oanda/type/primitives';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getOrderBook({ instrument: params.instrument as InstrumentName });
};

const getClosest = (buckets: OrderBookBucket[], price: string, range = 50) => {
  const index = buckets.findIndex(bucket => BigNumber(bucket.price).isGreaterThanOrEqualTo(price));
  return buckets.slice(index - range, index + range);
};

const OrderBook = () => {
  const { orderBook } = useLoaderData<typeof loader>();
  const data = getClosest(orderBook.buckets, orderBook.price);

  return <div>
    <Descriptions column={2} >
      <Descriptions.Item label='instrument'  >{orderBook.instrument}</Descriptions.Item>
      <Descriptions.Item label='time' >{new Date(orderBook.time).toLocaleString()}</Descriptions.Item>
      {/* <Descriptions.Item label='unixTime' >{orderBook.unixTime}</Descriptions.Item> */}
      <Descriptions.Item label='price' >{orderBook.price}</Descriptions.Item>
      <Descriptions.Item label='bucket width' >{orderBook.bucketWidth}</Descriptions.Item>
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

    <ul>
      <li un-m='b2' >
        <Link to='../candles' relative='path'  >
          Candles
        </Link>
      </li>
      <li>
        <Link to='../position-book' relative='path'  >
          Position Book
        </Link>
      </li>
    </ul>
  </div>;
};

export default () => <Suspense>
  <OrderBook />
</Suspense>;