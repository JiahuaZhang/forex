import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import { getTransactions } from '~/.server/oanda/transaction';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getTransactions({ accountID: params.id as any });
};

const Transaction = () => {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const { count, from, lastTransactionID, pageSize, pages, to } = data;

  return <Descriptions bordered >
    <Descriptions.Item label='count' >{count}</Descriptions.Item>
    <Descriptions.Item label='from'>{from}</Descriptions.Item>
    <Descriptions.Item label='to'>{to}</Descriptions.Item>
    <Descriptions.Item label='page size'>{pageSize}</Descriptions.Item>
    <Descriptions.Item label='last transaction id'>{lastTransactionID}</Descriptions.Item>
    <Descriptions.Item label='page'>
      <ul>
        {pages.map(page => <li key={page} > {page} </li>)}
      </ul>
    </Descriptions.Item>
  </Descriptions>;
};

export default Transaction;