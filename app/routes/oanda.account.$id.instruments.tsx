import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getInstruments } from '~/.server/oanda/account';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getInstruments(params.id!);
};

const Page = () => {
  const data = useLoaderData<typeof loader>();

  return <div>
    {JSON.stringify(data, null, 2)}
  </div>;
};

export default Page;