import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { getInstruments } from '~/.server/oanda/account';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getInstruments(params.id!);
};

export const action = async ({ params }: ActionFunctionArgs) => {
  return null;
};

const Latest = () => {
  const data = useLoaderData<typeof loader>();

  return <div>
    <div>
      candle specification:
    </div>

    <div un-grid='~' un-grid-cols='[repeat(auto-fit,_minmax(6em,_1fr))]' un-gap='2' un-mx='6' un-my='6' >
      {data.instruments.map(instrument => <span>{instrument.name}</span>)}
    </div>
  </div>;
};

export default Latest;