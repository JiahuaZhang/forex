import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { Descriptions, Popover } from 'antd';
import { useLoaderData } from 'react-router';
import { getOrders } from '~/.server/oanda/order';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getOrders({ accountID: params.id! });
};

const Orders = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  console.log(data);

  return <div>
    {
      data.orders.map(order => <Descriptions bordered size='small' un-m='2'>
        <Descriptions.Item label='id' >
          <Popover content={<pre un-overflow-y='auto' >
            {JSON.stringify(order)}
          </pre>} >
            <Link to={`../${order.id}`} relative='path' >
              {order.id}
            </Link>
          </Popover>
        </Descriptions.Item>
        <Descriptions.Item label='time' >{new Date(order.createTime).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label='type' >{order.type}</Descriptions.Item>
        <Descriptions.Item label='trade ID' >{order.tradeID}</Descriptions.Item>
        <Descriptions.Item label='price' >{order.price}</Descriptions.Item>
        <Descriptions.Item label='time in force' >{order.timeInForce}</Descriptions.Item>
        <Descriptions.Item label='trigger condition' >{order.triggerCondition}</Descriptions.Item>
        <Descriptions.Item label='trigger mode' >{order.triggerMode}</Descriptions.Item>
        <Descriptions.Item label='state' >{order.state}</Descriptions.Item>
      </Descriptions>)
    }
  </div>;
};

export default Orders;