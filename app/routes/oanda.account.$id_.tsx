import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getAccount } from '~/.server/oanda/account';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  return getAccount(params.id!);
};

const links = ['summary', 'instruments', 'changes'];
const Page = () => {
  const data = useLoaderData<typeof loader>();
  return <div>
    <ul un-list='none' un-mt='8' un-grid='~' un-gap='4'  >
      {
        links.map(link => (
          <li key={link}>
            <Link to={`./${link}`}>
              {link}
            </Link>
          </li>
        ))
      }
    </ul>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;
};

export default Page;