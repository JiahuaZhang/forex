import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Popover } from 'antd';
import { Suspense } from 'react';
import { getInstruments } from '~/.server/oanda/account';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getInstruments(params.id!);
};

const Page = () => {
  const data = useLoaderData<typeof loader>();

  return <div>
    <div un-grid='~' un-grid-cols='[repeat(auto-fit,_minmax(6em,_1fr))]' un-gap='2' un-mx='6' un-my='6' >
      {
        data.instruments.map(instrument => <Popover content={<pre un-h='96' un-overflow-y='auto' >
          {JSON.stringify(instrument, null, 2)}
        </pre>} >
          <Link to={`/oanda/instrument/${instrument.name}/candles`} > {instrument.name} </Link>
        </Popover>
        )
      }
    </div>

    <div>
      Last Trasnaction id: {data.lastTransactionID}
    </div>
  </div>;
};

export default () => <Suspense>
  <Page />
</Suspense>;
