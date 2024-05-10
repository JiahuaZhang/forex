import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Table } from 'antd';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getDailyForexSeries } from '~/.server/forex';
import { range } from '~/lib/rang';
import { ForexSeries } from '~/lib/type';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { base, quote } = params;
  return getDailyForexSeries(`${base}/${quote}`);
};

const Page = () => {
  const data = useLoaderData() as ForexSeries;
  const result = range(data);

  return <div un-grid='~' un-gap='4' >
    <Table dataSource={result.rangeData} columns={result.rangeColumn} rowKey='range' pagination={false} size='small' />

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

export default Page;