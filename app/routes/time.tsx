import { ActionFunctionArgs, defer } from '@remix-run/node';
import { Await, useFetcher } from '@remix-run/react';
import { AutoComplete, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Suspense, useState } from 'react';
import { getForexInterval, getForexIntervalSeries } from '~/.server/forex';
import { currencyPairs } from '~/lib/CurrencyGrid';
import { data } from './../lib/dummy';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const currency = formData.get('currency') as string;
  const pairs = currencyPairs[currency].map(p => `${p.substring(0, 3)}/${p.substring(3)}`).slice(0, 1);
  const start = formData.get('start') as string;

  return Promise.all(getForexIntervalSeries(pairs, start));
};

const currencies = Object.keys(currencyPairs);

const App = () => {
  const fetcher = useFetcher<typeof action>();
  const [currency, setCurrency] = useState('');
  const [options, setOptions] = useState<{ value: string; }[]>(currencies.map(value => ({ value })));
  const [startTime, setStartTime] = useState(dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'));
  const submit = () => {
    if (!currency) return;

    fetcher.submit({ currency, start: startTime }, { method: 'post' });
  };

  console.log('fetcher - data: ', fetcher.data);

  return <div>
    <div un-grid='~ justify-start gap-2 items-center' un-grid-flow='col' >
      <AutoComplete un-mr='2'
        autoFocus
        options={options}
        style={{ width: 200 }}
        onSelect={setCurrency}
        onSearch={(text) => setOptions(currencies.filter(c => new RegExp(text, 'i').test(c)).map(value => ({ value })))}
        placeholder="Currency"
      />
      <DatePicker
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