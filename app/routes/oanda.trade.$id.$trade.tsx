import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import { getTrade } from '~/.server/oanda/trade';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getTrade({ accountID: params.id as any, tradeSpecifier: params.trade! });
};

const Trade = () => {
  const data = useLoaderData<typeof loader>();
  const { trade } = data;

  return <div>
    <Descriptions bordered size='small' un-m='2'>
      <Descriptions.Item label='id' >
        {trade.id}
      </Descriptions.Item>
      <Descriptions.Item label='instrument' >{trade.instrument}</Descriptions.Item>
      <Descriptions.Item label='price' >{trade.price}</Descriptions.Item>
      <Descriptions.Item label='open time' >{new Date(trade.openTime).toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label='current units' >{trade.currentUnits}</Descriptions.Item>
      <Descriptions.Item label='state' >{trade.state}</Descriptions.Item>
      <Descriptions.Item label='initial units' >{trade.initialUnits}</Descriptions.Item>
      <Descriptions.Item label='initial margin required' >{trade.initialMarginRequired}</Descriptions.Item>
      <Descriptions.Item label='realized profit loss' >{trade.realizedPL}</Descriptions.Item>
      <Descriptions.Item label='financing' >{trade.financing}</Descriptions.Item>
      <Descriptions.Item label='dividend adjustment' >{trade.dividendAdjustment}</Descriptions.Item>
      <Descriptions.Item label='unrealized profit loss' >{trade.unrealizedPL}</Descriptions.Item>
      <Descriptions.Item label='margin used' >{trade.marginUsed}</Descriptions.Item>
    </Descriptions>
    <pre>{JSON.stringify(trade, null, 2)}</pre>
  </div>;
};

export default Trade;