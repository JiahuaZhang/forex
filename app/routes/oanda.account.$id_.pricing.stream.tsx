import { useParams } from '@remix-run/react';
import { Button, Descriptions, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AllInstrumentName, Instrument } from '~/lib/oanda/type/primitives';

const instrumentOptions = AllInstrumentName.map(value => ({ name: value, value }));

const Stream = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [value, setValue] = useState('');
  const params = useParams();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (!value) return;
    console.log({ value });

    const url = `/oanda/sse/pricing/${params.id}?instruments=${value}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener(`${params.id}-pricing-stream`, (event) => {
      const newData = event.data as string;
      if (newData.startsWith('{"type":"HEARTBEAT"')) {
        console.log(newData);
        return;
      }
      setData(prev => [...prev, newData]);
    });

    eventSource.onerror = (event) => {
      console.error(event);
    };

    return () => eventSource.close();

  }, [value]);

  return <div>
    <Descriptions size='middle' >
      <Descriptions.Item label='Current Instruments' >{value}</Descriptions.Item>
    </Descriptions>
    <section un-grid='~ inline' un-gap='4' un-auto-flow='col' un-justify='start' un-items='center'  >
      <Select un-min-w='96' options={instrumentOptions} value={instruments} onChange={setInstruments} mode='multiple' filterOption={
        (search, option) => option?.value.replace('_', '').includes(search.replace(/[-_]/g, '').toUpperCase()) ?? false
      } />
      <Button type='primary' disabled={!instruments.length}
        icon={<div className="i-ic:baseline-check" />}
        onClick={() => setValue(instruments.join(','))}
      />
    </section>
    {data.map((d, index) => (
      <pre key={index} un-border='solid 2 blue-1 rounded' un-whitespace='pre-wrap' un-word-break='break-word'>
        {d}
      </pre>
    ))}
  </div>;
};

export default Stream;