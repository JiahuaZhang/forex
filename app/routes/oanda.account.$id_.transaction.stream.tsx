import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { getTransactionsStreamData } from '~/.server/oanda/transaction';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getTransactionsStreamData(params.id as any);
};

const Stream = () => {
  const { url, key } = useLoaderData<typeof loader>();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    const fetchTransactionsStream = async () => {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${key}` } });

      if (!response.ok) {
        const errorResponse = await response.json();
        setData([JSON.stringify(errorResponse)]);
      }

      reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const transactions = chunk.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line)) as string[];

        setData(prev => [...transactions, ...prev]);
      }
    };

    fetchTransactionsStream()
      .catch(error => setData([JSON.stringify(error)]));

    return () => { reader?.cancel(); };
  }, [url, key]);

  return <div>
    {data.map(d => <pre un-border='solid 2 blue-1 rounded'>
      {JSON.stringify(d, null, 2)}
    </pre>)}
  </div>;
};

export default Stream;