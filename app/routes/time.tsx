import { ActionFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { DatePicker, Progress, Select, Statistic, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getForexIntervalSeries } from '~/.server/forex';
import { pairs } from '~/data/usd/2024-04-26 08.30.00';
import { currencyPairs } from '~/lib/CurrencyGrid';
import { TIME_FORMAT, firstMinuteAnalysis } from '~/lib/analysis';

const currencies = Object.keys(currencyPairs);
const options = currencies.map(value => ({ value, label: value }));

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const currency = formData.get('currency') as string;
  const pairs = currencyPairs[currency].map(p => `${p.substring(0, 3)}/${p.substring(3)}`);
  const start = formData.get('start') as string;
  return Promise.all(getForexIntervalSeries(pairs, start));
};

const App = () => {
  const fetcher = useFetcher<typeof action>();
  const [currency, setCurrency] = useState('');
  const [startTime, setStartTime] = useState(dayjs().startOf('day').format(TIME_FORMAT));
  const [data, setData] = useState<ReturnType<typeof firstMinuteAnalysis>[]>([]);
  const submit = () => {
    if (!currency) return;

    fetcher.submit({ currency, start: startTime }, { method: 'post' });
  };

  useEffect(() => {
    if (!fetcher.data) return;

    console.log(fetcher.data);
    const result = fetcher.data.map(d => firstMinuteAnalysis(currency, d.pair as any, d.values));
    setData(result);
  }, [fetcher.data]);

  // useEffect(() => {
  //   setData(pairs.map(p => firstMinuteAnalysis('usd', p.pair as any, p.values as any)));
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
      <footer un-grid='~' un-justify='center' un-mt='2' >
        {d.isFail && <>
          <h1 un-text='lg center red-5'>⚠️ Fail case</h1>
          <div un-grid='~' un-grid-flow='col' un-justify='start' un-gap='14'>
            <Statistic title='start' value={d.start_value} />
            <Statistic title='first minute' value={d.first_min_value} />
            <Statistic title='peak' value={d.peak_value} />
            <Statistic title='closes' value={d.isIncreasing ? d.closest.high : d.closest.low} valueStyle={{ color: 'red' }} />
          </div>
          <div un-grid='~' un-grid-flow='col' un-justify='start' un-gap='14'>
            <Statistic title='first minute change' value={d.first_min_change} suffix='%' />
            <Statistic title='peak change' value={d.peak_change} suffix='%' />
            <Statistic title='closes change' value={d.closest.change} suffix='%' valueStyle={{ color: 'red' }} />
          </div>
          <Tooltip title='cloest value relative to first minute extreme progress' >
            <Progress percent={d.closest_progress} format={percent => `${percent?.toFixed(4)}%`} strokeColor='red' />
          </Tooltip>
        </>}
        {!d.isFail && <>
          <div un-grid='~' un-grid-flow='col' un-justify='start' un-gap='14'>
            <Statistic title='start' value={d.start_value} />
            <Statistic title='first minute' value={d.first_min_value} />
            <Statistic title='peak' value={d.peak_value} />
            <Statistic title='extreme' value={d.isIncreasing ? d.highest : d.lowest} />
          </div>
          <div un-grid='~' un-grid-flow='col' un-justify='start' un-gap='14'>
            <Statistic title='first minute change' value={d.first_min_change} suffix='%' />
            <Statistic title='peak change' value={d.peak_change} suffix='%' />
            <Statistic title='extreme change' value={d.extreme_change} suffix='%' />
          </div>
          <div>
            <Tooltip title='first minute relative to peak progress' >
              <Progress percent={d.first_min_peak_progress} format={percent => `${percent?.toFixed(4)}%`} />
            </Tooltip>
            <Tooltip title='first minute relative to extreme progress' >
              <Progress percent={d.first_min_extreme_progress} format={percent => `${percent?.toFixed(4)}%`} strokeColor='red' />
            </Tooltip>
          </div>
        </>}
      </footer>
    </div>)}
    <div un-grid='~ justify-start gap-2 items-center' un-grid-flow='col' >
      <Select un-w='40'
        autoFocus
        showSearch
        options={options}
        value={currency}
        onChange={setCurrency}
      />
      <DatePicker
        showTime
        value={dayjs(startTime)}
        onChange={(_, dateString) => dateString && setStartTime(dateString as string)}
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