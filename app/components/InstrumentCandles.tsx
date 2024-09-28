import { Radio, Table } from 'antd';
import dayjs from 'dayjs';
import { ChartOptions, createChart, IPriceLine } from 'lightweight-charts';
import _ from 'lodash';
import { Suspense, useEffect, useState } from 'react';
import { Bar, BarChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ClientOnly } from 'remix-utils/client-only';
import { convertCandle } from '~/lib/chart/useCandleChart';
import { candleSpreadAnalysis, firstCycleAnalysis, linearAnalysis, multipleGranularityAnalysis, upDownAnalysis } from '~/lib/oanda/analysis/candle-analysis';
import { Candlestick, CandlestickGranularity } from '~/lib/oanda/type/instrument';
import { InstrumentName } from '~/lib/oanda/type/primitives';
import USD from './data/USD_FOMC_SEPT_RATE_CUT.json';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InstrumentCandles } from './CandlesChart';

dayjs.extend(timezone);
dayjs.extend(utc);



const SimpleValuation = ({ data }: { data: ReturnType<typeof firstCycleAnalysis>; }) => {
  return <div un-grid='~' un-justify='center' un-text='center' >
    <span un-text='blue-4' un-font='bold' >
      {data[0].granularity}
    </span>
    <Suspense>
      <BarChart data={data}
        width={800}
        height={200}
      >
        <XAxis dataKey='instrument' />
        <Tooltip />
        <Bar dataKey='valuation' fill='tomato' />
      </BarChart>
    </Suspense>
  </div>;
};

const SimpleCurrencyChange = ({ data }: { data: ReturnType<typeof firstCycleAnalysis>; }) => {
  return <div un-grid='~' un-justify='center' un-text='center' >
    <span un-text='blue-4' un-font='bold' >
      {data[0].granularity}
    </span>
    <Suspense>
      <BarChart data={data}
        width={800}
        height={200}
      >
        <XAxis dataKey='instrument' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='currency_change' fill='skyblue' />
      </BarChart>
    </Suspense>
  </div>;
};

const SimplePipChange = ({ data }: { data: ReturnType<typeof firstCycleAnalysis>; }) => {
  return <div un-grid='~' un-justify='center' un-text='center' >
    <span un-text='blue-4' un-font='bold' >
      {data[0].granularity}
    </span>
    <Suspense>
      <BarChart data={data}
        width={800}
        height={200}
      >
        <XAxis dataKey='instrument' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='pip_difference' fill='#50C878' />
      </BarChart>
    </Suspense>
  </div>;
};

const Cliff = ({ data }: { data: ReturnType<typeof upDownAnalysis>; }) => {
  console.log(data);


  return <div>
    {data[0].currency} - {data[0].instrument}
    {
      data.map(d => <div>

        {
          d.index
        }

        {
          dayjs(d.candleStick.time).toString()
        }

        {
          d.state
        }



      </div>

      )

    }

    <Table dataSource={data} columns={[
      { title: 'index', dataIndex: 'index', },
      {
        title: 'value', dataIndex: 'candleStick', render: (item) => {
          return <div>{item.mid.o}</div>;
        }
      },
      {
        title: 'time', dataIndex: 'candleStick', render: (item,) => {
          return <div> {dayjs(item.time * 1000).tz('America/New_York').format("YYYY-MM-DD HH:mm:ss")
            .toString()}  </div>;
        }
      },
      { title: 'change (pip)', dataIndex: 'change' },
      { title: 'change (%)', dataIndex: 'change_percent' },
      {
        title: 'elapsed',
        dataIndex: 'elapsed'
      },
      { title: 'state', dataIndex: 'state' }
    ]} pagination={false} size='small'
    />
  </div>;
};

const LinearTiles = ({ data }: { data: ReturnType<typeof linearAnalysis>; }) => {
  console.log(data);


  return <div>
    <Suspense>
      <BarChart data={data}
        width={800}
        height={200}
      >
        {/* <XAxis dataKey='index' /> */}
        <YAxis />
        <Tooltip />
        <Bar dataKey='simple_state' fill='skyblue' />
      </BarChart>
    </Suspense>
  </div>;
};

export const Demo = () => {
  // const result = multipleGranularityAnalysis({ currency: 'CHF', data: USD as any });
  console.log(USD);
  // const analysis = upDownAnalysis('USD', USD[5].GBP_USD[0]);
  // const result = linearAnalysis('USD', USD[5].GBP_USD[0]);

  // console.log(result);


  return <div>
    <InstrumentCandles instrument='USD_JPY' granularity='S5' candles={USD[1].USD_JPY![0].candles} />

    {/* <LinearTiles data={result} /> */}

    {/* <Cliff data={upDownAnalysis('CHF', USD[5].GBP_USD![0])} /> */}
    {/* {(['S5', 'M1', 'M15', 'H1'] as const).map(g => <SimpleValuation data={result[g]} />)}
    {(['S5', 'M1', 'M15', 'H1'] as const).map(g => <SimpleCurrencyChange data={result[g]} />)}
    {(['S5', 'M1', 'M15', 'H1'] as const).map(g => <SimplePipChange data={result[g]} />)} */}
  </div>;
};

// todo, find a really good statistics
// comparing cross currencies