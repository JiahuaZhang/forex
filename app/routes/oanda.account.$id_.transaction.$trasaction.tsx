import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { getTransaction } from '~/.server/oanda/transaction';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getTransaction({
    accountID: params.id as any,
    transactionID: params.trasaction as any
  });
};

// DailyFinancingTransaction | OrderFilled

const Transaction = () => {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const { transaction } = data;

  return <div>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;
};

export default Transaction;