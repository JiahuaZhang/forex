import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getAccounts } from '~/.server/oanda';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getAccounts();
};

const Account = () => {
  const data = useLoaderData<typeof loader>();
  return <ul un-list='none' un-mt='8' un-grid='~' un-gap='4' >
    {
      data.accounts.map(account => (
        <li key={account.id}>
          <Link to={`./${account.id}`}>
            {account.id}
          </Link>
        </li>
      ))
    }
  </ul>;
};

export default Account;