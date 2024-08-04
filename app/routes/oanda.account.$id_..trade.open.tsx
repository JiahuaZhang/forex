import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { Descriptions, Popover } from 'antd';
import { useLoaderData } from 'react-router';
import { getOpenTrades } from '~/.server/oanda/trade';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getOpenTrades({ accountID: params.id as any });
};


const Trades = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return <div>{
    data.trades.map(trade => <Descriptions key={trade.id} bordered size='small' un-m='2' >
      <Descriptions.Item label='id' >
        <Popover content={<pre >
          {JSON.stringify(trade, null, 2)}
        </pre>} >
          <Link to={`../${trade.id}`} relative='path' >
            {trade.id}
          </Link>
        </Popover>
      </Descriptions.Item>

      <Descriptions.Item label='instrument' >{trade.instrument}</Descriptions.Item>
      <Descriptions.Item label='price' >{trade.price}</Descriptions.Item>
      <Descriptions.Item label='currentUnits' >{trade.currentUnits}</Descriptions.Item>
      <Descriptions.Item label='openTime' >{new Date(trade.openTime).toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label='state' >{trade.state}</Descriptions.Item>
      <Descriptions.Item label='realizedPL' >{trade.realizedPL}</Descriptions.Item>
      <Descriptions.Item label='unrealizedPL' >{trade.unrealizedPL}</Descriptions.Item>

      <Descriptions.Item label='financing' >{trade.financing}</Descriptions.Item>
      <Descriptions.Item label='marginUsed' >{trade.marginUsed}</Descriptions.Item>
      <Descriptions.Item label='dividendAdjustment' >{trade.dividendAdjustment}</Descriptions.Item>
      <Descriptions.Item label='initialUnits' >{trade.initialUnits}</Descriptions.Item>
      <Descriptions.Item label='initialMarginRequired' >{trade.initialMarginRequired}</Descriptions.Item>
    </Descriptions>)
  }</div>;
};

export default Trades;