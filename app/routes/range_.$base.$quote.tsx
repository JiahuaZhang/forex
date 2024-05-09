import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Table } from 'antd';
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
    <Table dataSource={result.values} columns={result.column} rowKey='datetime' pagination={false} size='small' />
  </div>;
};

export default Page;