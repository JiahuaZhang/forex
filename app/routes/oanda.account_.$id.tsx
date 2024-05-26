import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getAccount } from '~/.server/oanda';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  return getAccount(params.id!);
};

const Page = () => {
  const data = useLoaderData<typeof loader>();
  return <div>
    <ul un-list='none' un-mt='8' un-grid='~' un-gap='4'  >
      <li>
        <Link to={'./summary'} >
          summary
        </Link>
      </li>
    </ul>
    {JSON.stringify(data, null, 2)}</div>;
};

export default Page;