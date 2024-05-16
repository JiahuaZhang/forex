import { ActionFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { Button, DatePicker, InputNumber, Progress, Select, Slider, Table, TimePicker } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getForexSeries } from '~/.server/forex';
import { currencyIcons, currencyPairs } from '~/lib/CurrencyGrid';
import { trend } from '~/lib/trend';
import { ErrorResponse, ForexSeries } from '~/lib/type';
import { data } from './../data/trend/usd/2024-05-03 10.00.00';

const currencies = Object.keys(currencyPairs);
const currencyOptions = currencies.map(value => ({ value, label: value }));

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const symbol = formData.get('symbol') as string;
  const start = formData.get('start') as string;
  return getForexSeries({ symbol: `${symbol.substring(0, 3)}/${symbol.substring(3)}`, interval: '1min', start, end: start });
};

const ExecutionPanel = ({ execution, is_appreciated, open, high, low, close, remove }: { execution: string, is_appreciated: boolean, open: number, high: number, low: number, close: number; remove: (value: string) => void; }) => {
  const value = BigNumber(execution);
  const percent = (start: BigNumber, between: BigNumber, end: BigNumber) => between.minus(start)
    .dividedBy(
      end.minus(start)
    )
    .multipliedBy(100)
    .toNumber();
  let fail = false;

  let content = <></>;
  if (is_appreciated) {
    if (BigNumber(close).isGreaterThanOrEqualTo(value)) {
      content = <Progress percent={percent(BigNumber(open), value, BigNumber(close))} strokeColor='green' un-w='100' />;
    } else if (BigNumber(high).isGreaterThanOrEqualTo(value)) {
      content = <Progress percent={percent(BigNumber(open), value, BigNumber(high))} strokeColor='yellow' un-w='100' />;
    } else {
      fail = true;
      content = <Progress percent={percent(BigNumber(open), BigNumber(high), value)} strokeColor='red' un-w='100' />;
    }
  } else {
    if (BigNumber(close).isLessThanOrEqualTo(value)) {
      content = <Progress percent={percent(BigNumber(open), value, BigNumber(close))} strokeColor='green' un-w='100' />;
    } else if (BigNumber(low).isLessThanOrEqualTo(value)) {
      content = <Progress percent={percent(BigNumber(open), value, BigNumber(low))} strokeColor='yellow' un-w='100' />;
    } else {
      fail = true;
      content = <Progress percent={percent(BigNumber(open), BigNumber(low), value)} strokeColor='red' un-w='100' />;
    }
  }

  return <div un-grid='~' un-items='center' un-justify='between' un-grid-flow='col' >
    <span un-text={`${fail ? 'red-5' : ''}`} >{execution}</span>
    {content}
    <div className="i-ph:trash" un-hover='text-red-600' un-cursor='pointer' onClick={() => remove(execution)} ></div>
  </div>;
};

const Trend = () => {
  const fetcher = useFetcher<typeof action>();
  const [currency, setCurrency] = useState('');
  const [symbol, setSymbol] = useState('');
  const [symbolOptions, setSymbolOptions] = useState<{ value: string, label: string; }[]>([]);
  const [day, setDay] = useState(dayjs().startOf('day'));
  const [time, setTime] = useState(dayjs().startOf('day'));
  const [trendData, setTrendData] = useState<ReturnType<typeof trend>>();
  const [estimate, setEstimate] = useState(0);
  const [value, setValue] = useState('1');
  const [executions, setExecutions] = useState<string[]>([]);

  useEffect(() => {
    if (!currency) {
      setSymbolOptions([]);
    } else {
      setSymbolOptions(currencyPairs[currency].map(p => ({ value: p, label: p })));
      if (!symbol.toLowerCase().includes(currency)) {
        setSymbol('');
      }
    };
  }, [currency]);

  useEffect(() => {
    if (!trendData) return;
    setEstimate(trendData.data2[7].value);
  }, [trendData]);

  useEffect(() => {
    if (!fetcher.data) return;
    if ((fetcher.data as ErrorResponse).status === 'error') {
      console.log(fetcher.data);
      return;
    }

    console.log(fetcher.data);
    setTrendData(trend(fetcher.data as ForexSeries));
  }, [fetcher.data]);

  // useEffect(() => {
  //   setTrendData(trend(data as any));
  // }, []);

  return <>
    <div un-grid='~ flow-col' un-justify='start' un-gap='4' un-items='center' >
      <Select un-w='40'
        showSearch
        options={currencyOptions}
        value={currency}
        onChange={setCurrency}
        labelRender={label => <div un-flex='~' un-items='center' >
          <div className={`${currencyIcons[label.value]}`} un-mr='2'></div>
          {label.label}
        </div>}
        optionRender={option => <div un-flex='~' un-items='center' >
          <div className={`${currencyIcons[option.value!]}`} un-mr='2'></div>
          {option.label}
        </div>}
      />
      <Select un-w='40'
        showSearch
        options={symbolOptions}
        value={symbol}
        onChange={setSymbol} />
      <DatePicker
        value={day}
        onChange={setDay}
        disabledDate={d => d.day() === 6 || d > dayjs().endOf('day')}
      />
      <TimePicker value={time}
        use12Hours
        minuteStep={15}
        format='h:mm a'
        onChange={setTime} />
      {fetcher.state === 'submitting' && <div className="i-line-md:loading-loop" un-text='blue-600' ></div>}
      {
        currency && symbol && fetcher.state === 'idle'
        && <button
          un-cursor='pointer' un-bg='transparent' un-border='none' un-text='lg' un-inline='grid'
          onClick={() => fetcher.submit({ symbol, start: `${day.format('YYYY-MM-DD')} ${time.second(0).format('HH:mm:ss')}` }, { method: 'post' })}
        >
          <div className="i-ic:baseline-check" ></div>
        </button>
      }
    </div>
    <div un-hidden={`${trendData ? '' : '~'}`} un-mt='2' un-p='2' >
      <Table dataSource={trendData?.data1} columns={trendData?.column1} pagination={false} size='small' rowKey='open' />
      <br />
      <Table dataSource={trendData?.data2} columns={trendData?.column2} pagination={false} size='small' rowKey='percent' />
      <div un-flex='~' un-m='2' un-mt='8' un-items='center' un-flex-grow='[&>div]:1!' >
        <Slider
          min={1}
          max={99}
          defaultValue={70}
          tooltip={{ open: trendData && true }}
          onChange={value => {
            setEstimate(
              BigNumber(trendData!.data1[0].difference)
                .dividedBy(value)
                .multipliedBy(100)
                .plus(trendData!.data1[0].open)
                .toNumber()
            );
          }}
        />
        <span un-ml='2' un-flex-grow='0' >{estimate}</span>
      </div>
      <InputNumber value={value}
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
      <div>
        {executions.map(excution => <ExecutionPanel key={excution}
          execution={excution}
          is_appreciated={trendData?.data1[0].is_appreciated!}
          open={trendData?.data1[0].open!}
          high={trendData?.data1[0].high!}
          low={trendData?.data1[0].low!}
          close={trendData?.data1[0].close!}
          remove={val => setExecutions(prev => prev.filter(e => e !== val))}
        />)}
      </div>
    </div>
  </>;
};

export default Trend;