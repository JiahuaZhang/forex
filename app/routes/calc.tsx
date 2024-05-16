import { Button, InputNumber, Table } from 'antd';
import { useState } from 'react';
import { PositionStick } from '~/components/PositionBar';
import { calc } from '~/lib/calc';

const Calc = () => {
  const [start, setStart] = useState('1');
  const [end, setEnd] = useState('1');
  const [data, setData] = useState<ReturnType<typeof calc>>();
  const [value, setValue] = useState('1');
  const [executions, setExecutions] = useState<string[]>([]);

  return <div>
    <header un-grid='~ flow-col' un-gap='4' un-justify='start' un-items='center' >
      <InputNumber value={start}
        placeholder='Start'
        onChange={v => setStart(v as string)}
        min='0'
        max='400'
        step='0.0001'
        stringMode
      />
      <InputNumber value={end}
        placeholder='End'
        onChange={v => setEnd(v as string)}
        min='0'
        max='400'
        step='0.0001'
        stringMode
      />
      {
        start !== end &&
        <button
          un-cursor='pointer' un-bg='transparent' un-border='none' un-text='lg' un-inline='grid'
          onClick={() => {
            setData(calc(start, end));
          }}
        >
          <div className="i-ic:baseline-check" ></div>
        </button>
      }
    </header>
    <section un-mx='6' un-mt='2' >
      {data && <Table dataSource={data.data} columns={data.column} pagination={false} size='small' />}
    </section>
    <section>
      {
        data && <div un-mt='4' ><InputNumber value={value}
          onChange={v => setValue(v as string)}
          min="0"
          max="400"
          step="0.00001"
          stringMode
          onKeyDown={e => e.key === 'Enter' && setExecutions(prev => prev.includes(value) ? prev : [...prev, value])}
        />
          <Button un-ml='2'
            type='primary'
            onClick={() => setExecutions(prev => prev.includes(value) ? prev : [...prev, value])}
          >+</Button>
        </div>
      }
      <div un-m='2' un-grid='~' un-gap='2' >
        {
          executions.map(excution => <PositionStick open={start} close={end} value={excution} key={excution} />)
        }
      </div>
    </section>
  </div>;
};

export default Calc;