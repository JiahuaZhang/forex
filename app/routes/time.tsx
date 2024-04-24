import { ActionFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { AutoComplete, DatePicker, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getForexIntervalSeries } from '~/.server/forex';
import { currencyPairs } from '~/lib/CurrencyGrid';
import { TIME_FORMAT, firstMinuteAnalysis } from '~/lib/analysis';
import { pairs } from './../lib/dummy';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const currency = formData.get('currency') as string;
  const pairs = currencyPairs[currency].map(p => `${p.substring(0, 3)}/${p.substring(3)}`);
  const start = formData.get('start') as string;
  return Promise.all(getForexIntervalSeries(pairs, start));
};

const currencies = Object.keys(currencyPairs);

const App = () => {
  const fetcher = useFetcher<typeof action>();
  const [currency, setCurrency] = useState('');
  const [options, setOptions] = useState<{ value: string; }[]>(currencies.map(value => ({ value })));
  const [startTime, setStartTime] = useState(dayjs().startOf('day').format(TIME_FORMAT));
  // const [startTime, setStartTime] = useState(dayjs('2024-04-16 08:30:00').format(TIME_FORMAT));
  const [data, setData] = useState<ReturnType<typeof firstMinuteAnalysis>[]>([]);
  const submit = () => {
    if (!currency) return;

    fetcher.submit({ currency, start: startTime }, { method: 'post' });
  };

  useEffect(() => {
    if (!fetcher.data) return;

    const result = fetcher.data.map(d => firstMinuteAnalysis(currency, d.pair as any, d.values));
    setData(result);
  }, [fetcher.data]);

  // useEffect(() => {
  //   setData(pairs.map(p => firstMinuteAnalysis(currency, p.pair as any, p.values as any)));
  // }, []);

  return <div>
    {data.map(d => <div key={d.symbol} un-mb='4' >
      <h1 un-text='lg' un-grid='~ justify-around' un-grid-flow='col' un-m='0'>
        <section un-text={d.isIncreasing ? 'green-6' : 'red-6'} un-grid='~' un-grid-flow='col' un-gap='2' un-items='center' >
          {d.symbol} <div className={`${d.isIncreasing ? 'i-ph:trend-up' : 'i-ph:trend-down'}`} ></div>
        </section>
        <section un-text={d.isAppreciated ? 'green-6' : 'red-6'} un-grid='~' un-grid-flow='col' un-gap='2' un-items='center'>
          <div className={`i-ph:trend-${d.isAppreciated ? 'up' : 'down'}`} ></div> {d.currency}
        </section>
      </h1>
      <Table dataSource={d.data} columns={d.column} pagination={false} size='small' rowKey='datetime' />
    </div>)}
    <div un-grid='~ justify-start gap-2 items-center' un-grid-flow='col' >
      <AutoComplete un-mr='2'
        autoFocus
        options={options}
        style={{ width: 200 }}
        onSelect={setCurrency}
        onSearch={text => {
          const newOptions = currencies.filter(c => new RegExp(text, 'i').test(c)).map(value => ({ value }));
          setOptions(newOptions);
          if (newOptions.length === 1) setCurrency(newOptions[0].value);
        }}
        placeholder="Currency"
      />
      <DatePicker
        // defaultValue={dayjs('2024-04-16 08:30:00')}
        defaultValue={dayjs().startOf('day')}
        showTime
        onChange={(_, dateString) => {
          setStartTime(dateString as string);
        }}
      />
      {fetcher.state === 'submitting' && <div className="i-line-md:loading-loop" un-text='blue-600' ></div>}
      {fetcher.state === 'idle' &&
        <button onClick={submit} un-cursor='pointer' un-bg='transparent' un-border='none' un-text='lg' un-inline='grid' >
          <div className="i-ic:baseline-check" ></div>
        </button>
      }
    </div>
  </div>;
};

export default App;