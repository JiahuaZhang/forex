import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { getAccount } from '~/.server/oanda/account';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  return getAccount(params.id!);
};

const links = ['summary', 'instruments', 'changes'];
const otherLinks = ['order', 'position', 'trade'];
const Page = () => {
  const data = useLoaderData<typeof loader>();
  const { id } = useParams();

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
      {
        otherLinks.map(link => (
          <li key={link}>
            <Link to={`/oanda/${link}/${id}/list`}>
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