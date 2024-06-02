import type { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { getAccountChanges } from '~/.server/oanda';

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  const sinceTransactionID = formData.get('sinceTransactionID') as string;
  return getAccountChanges(id, sinceTransactionID);
};

export default function Page() {
  const params = useParams();
  const fetcher = useFetcher<typeof action>();
  const [id, setId] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('sinceTransactionID');
    setId(id ? parseInt(id) : 0);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (id) {
      query.set('sinceTransactionID', id.toString());
    } else {
      query.delete('sinceTransactionID');
    }

    window.history.pushState({}, '', `${window.location.pathname}?${query}`);
  }, [id]);

  console.log(fetcher.data);

  return (
    <div>
      <div un-grid='~' un-grid-flow='col' un-items='center' un-justify='start' un-gap='2' >
        <Input un-max-w='40'
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
          type='number' />
        {fetcher.state === 'submitting' && <div className="i-line-md:loading-loop" un-text='blue-600' ></div>}
        {fetcher.state === 'idle' &&
          <button un-cursor='pointer'
            un-bg='transparent'
            un-border='none'
            un-text='lg'
            un-inline='grid'
            onClick={() => {
              console.log(params.id, id);
              fetcher.submit({ id: params.id!, sinceTransactionID: id }, { method: 'post' });
            }}
          >
            <div className="i-ic:baseline-check" ></div>
          </button>}
      </div>
      <h1>Account changes</h1>
      <pre>
        {fetcher.data && JSON.stringify(fetcher.data, null, 2)}
      </pre>
    </div>
  );
}