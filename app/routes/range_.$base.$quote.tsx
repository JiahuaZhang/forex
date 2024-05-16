import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { Table } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getDailyForexSeries } from '~/.server/forex';
import { PositionBar } from '~/components/PositionBar';
import { data } from '~/data/range/gbp-cad';
import { range } from '~/lib/rang';

export const meta: MetaFunction = () => [{ title: 'Range $' }];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { base, quote } = params;
  const series = await getDailyForexSeries(`${base}/${quote}`);
  return {
    api: process.env.TWELVEDATA_API_KEY,
    series
  };
};

const Page = () => {
  const { api, series } = useLoaderData<typeof loader>();
  const result = range(series as any);
  const { base, quote } = useParams();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${api}`);
    socket.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      if ('price' in obj) {
        setPrice(obj['price']);
      }
    };

    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: 'subscribe',
        params: { symbols: `${base}/${quote}` }
      }));
    };
  }, []);

  return <div un-grid='~' un-gap='4' >
    <Table dataSource={result.rangeData} columns={result.rangeColumn} rowKey='range' pagination={false} size='small' />
    <PositionBar low={result.rangeData[0].low} high={result.rangeData[0].high} value={price} />
    <PositionBar low={result.rangeData[1].low} high={result.rangeData[1].high} value={price} />
    <PositionBar low={result.rangeData[2].low} high={result.rangeData[2].high} value={price} />
    <div un-grid='~' un-justify='center' >
      <LineChart width={1200} height={400} data={[...result.values].reverse()}  >
        <XAxis dataKey='datetime' />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="high" stroke="green" />
        <Line type="monotone" dataKey="low" stroke="red" />
        {/* <Line type="monotone" dataKey="open" stroke="blue" /> */}
        {/* <Line type="monotone" dataKey="close" stroke="blue" /> */}
      </LineChart>
    </div>
    <Table dataSource={result.values} columns={result.column} rowKey='datetime' pagination={false} size='small' />
  </div>;
};

export default () => <Suspense>
  <Page />
</Suspense>;