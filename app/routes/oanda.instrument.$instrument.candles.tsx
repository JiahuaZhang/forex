import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { Suspense } from 'react';
import { getCandles } from '~/.server/oanda/instrument';
import { convertCandle, useCandleChart } from '~/lib/chart/useCandleChart';
import { Currency } from '~/lib/oanda/type/primitives';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getCandles({ instrument: params.instrument as any });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};


const Candles = () => {
  const { instrument } = useParams();
  const data = useLoaderData<typeof loader>();
  const candles = convertCandle(data.candles);
  useCandleChart('container', instrument?.split('_')[1] as Currency, candles);

  return <div>
    <div id='container' un-h='96' />
    <ul  >
      <li un-m='b2' >
        <Link to='../order-book' relative='path'  >
          Order Book
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
  <Candles />
</Suspense>;