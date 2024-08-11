import { useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useEventSource } from 'remix-utils/sse/react';

const Stream = () => {
  const params = useParams();
  const [data, setData] = useState<string[]>([]);
  const response = useEventSource(`/oanda/sse/transaction/${params.id}`, { event: `${params.id}-transaction-stream` });
  useEffect(() => setData(prev => [response ?? '', ...prev]), [response]);

  return <div>
    {data.map(d => <pre un-border='solid 2 blue-1 rounded'>{d}</pre>)}
  </div>;
};

export default Stream;