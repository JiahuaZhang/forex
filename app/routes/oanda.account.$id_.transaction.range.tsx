import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { getTransactionsRange } from '~/.server/oanda/transaction';

export const loader = async ({ request, params, }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const { from, to, type } = Object.fromEntries(url.searchParams);
  return getTransactionsRange({
    accountID: params.id as any,
    from: from as any,
    to: to as any,
    type: type as any
  });
};


const Range = () => {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return <div>
    {
      data.transactions.map(transaction => <pre key={transaction.id} un-border='solid 2 blue-1 rounded' >
        {JSON.stringify(transaction, null, 2)}
      </pre>)
    }
  </div >;
};

export default Range;