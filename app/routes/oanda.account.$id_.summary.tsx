import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAccountSummary } from '~/.server/oanda/account';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getAccountSummary(params.id!);
};

const Page = () => {
  const data = useLoaderData<typeof loader>();

  return <pre>
    {JSON.stringify(data, null, 2)}
  </pre>;
};

export default Page;