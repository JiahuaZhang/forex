import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import { getOrder } from '~/.server/oanda/order';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getOrder({ accountID: params.id as any, orderSpecifier: params.order! });
};

const Order = () => {
  const data = useLoaderData<typeof loader>();
  const { order } = data;

  return <div>
    <Descriptions bordered size='small' un-m='2'>
      <Descriptions.Item label='id' >
        {order.id}
      </Descriptions.Item>
      <Descriptions.Item label='time' >{new Date(order.createTime).toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label='type' >{order.type}</Descriptions.Item>
      <Descriptions.Item label='trade ID' >{order.tradeID}</Descriptions.Item>
      <Descriptions.Item label='price' >{order.price}</Descriptions.Item>
      <Descriptions.Item label='time in force' >{order.timeInForce}</Descriptions.Item>
      <Descriptions.Item label='trigger condition' >{order.triggerCondition}</Descriptions.Item>
      <Descriptions.Item label='trigger mode' >{order.triggerMode}</Descriptions.Item>
      <Descriptions.Item label='state' >{order.state}</Descriptions.Item>
    </Descriptions>
    <pre>{JSON.stringify(order, null, 2)}</pre>
  </div>;
};

export default Order;