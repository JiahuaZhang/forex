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
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InstrumentCandles } from './CandlesChart';
import CHF from '../data/chf/2024-11-1 0.3.30.json';
import { InstrumentGrid } from './InstrumentGrid';

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
  const granularity: CandlestickGranularity = 'M10';
  const index = 2;

  return <div>
    <InstrumentGrid data={CHF as any} currency='CHF' />


    {/* <InstrumentCandles instrument='EUR_CHF' granularity={granularity} candles={CHF[0].EUR_CHF![index].candles} />
    <InstrumentCandles instrument='USD_CHF' granularity={granularity} candles={CHF[1].USD_CHF![index].candles} />
    <InstrumentCandles instrument='AUD_CHF' granularity={granularity} candles={CHF[2].AUD_CHF![index].candles} />
    <InstrumentCandles instrument='GBP_CHF' granularity={granularity} candles={CHF[3].GBP_CHF![index].candles} />
    <InstrumentCandles instrument='CHF_JPY' granularity={granularity} candles={CHF[4].CHF_JPY![index].candles} />
    <InstrumentCandles instrument='CAD_CHF' granularity={granularity} candles={CHF[5].CAD_CHF![index].candles} /> */}

  </div>;
};

// todo, find a really good statistics
// comparing cross currencies