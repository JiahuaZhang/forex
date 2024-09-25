import { Radio, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { ChartOptions, createChart, IPriceLine } from 'lightweight-charts';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ClientOnly } from 'remix-utils/client-only';
import { convertCandle } from '~/lib/chart/useCandleChart';
import { candleSpreadAnalysis } from '~/lib/oanda/analysis/candle-analysis';
import { Candlestick, CandlestickGranularity } from '~/lib/oanda/type/instrument';
import { InstrumentName } from '~/lib/oanda/type/primitives';

const chartOptions = {
  localization: { timeFormatter: (time) => dayjs(time as unknown as number * 1000).format('YYYY-MM-DD HH:mm:ss'), },
  timeScale: { timeVisible: true }
} as ChartOptions;

const CandlesChart = ({ id, instrument, granularity, candles }: {
  id: string;
  instrument: InstrumentName;
  granularity: CandlestickGranularity;
  candles: Candlestick[];
}) => {
  const [pricing, setPricing] = useState<'mid' | 'bid' | 'ask'>('mid');
  const [data, setData] = useState<ReturnType<typeof convertCandle>>([]);

  useEffect(() => {
    const newData = convertCandle(candles as any, pricing);
    setData(newData);
  }, [pricing]);

  useEffect(() => {
    if (!document) return;

    const chart = createChart(document.getElementById(id)!, chartOptions);
    const mainSeries = chart.addCandlestickSeries({ lastValueVisible: false, priceScaleId: 'main' });
    mainSeries.setData(data as any);
    const volumeData = data.map(d => ({ time: d.time, value: d.volume }));
    const volumeSeries = chart.addHistogramSeries({ priceScaleId: 'volume', lastValueVisible: false, });
    volumeSeries.setData(volumeData as any);
    chart.priceScale('main').applyOptions({ scaleMargins: { top: 0.1, bottom: 0.4 } });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    chart.timeScale().fitContent();

    let lastVolumePriceLine: IPriceLine | null = null;
    let lastMainPriceLine: IPriceLine | null = null;
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) return;
      const volume = param.seriesData.get(volumeSeries);
      const main = param.seriesData.get(mainSeries);

      if (lastVolumePriceLine) {
        volumeSeries.removePriceLine(lastVolumePriceLine);
      }
      if (lastMainPriceLine) {
        mainSeries.removePriceLine(lastMainPriceLine);
      }
      if (volume) {
        lastVolumePriceLine = volumeSeries.createPriceLine({ price: (volume as any).value });
      }
      if (main) {
        lastMainPriceLine = mainSeries.createPriceLine({ price: (main as any).open });
      }
    });

    return () => chart.remove();
  }, [document, data]);

  return <div>
    <header un-grid='~' un-grid-flow='col' un-justify='between' un-items='center' un-mb='2'>
      {instrument} {granularity}
      <Radio.Group value={pricing} onChange={(e) => setPricing(e.target.value)} optionType='button' buttonStyle='solid'>
        <Radio value='ask'>Ask</Radio>
        <Radio value='mid'>Mid</Radio>
        <Radio value='bid'>Bid</Radio>
      </Radio.Group>
    </header>
    <main id={id} un-h='96' />
  </div>;
};

const SpreadAnalysisChart = ({ id, instrument, granularity, candles }: {
  id: string;
  instrument: InstrumentName;
  granularity: CandlestickGranularity;
  candles: Candlestick[];
}) => {
  const spreadData = candleSpreadAnalysis(candles);

  return <div>
    <header un-grid='~' un-grid-flow='col' un-justify='between' un-items='center' un-mb='2'>
      {instrument} {granularity}
    </header>
    <LineChart
      width={1200}
      height={600}
      data={spreadData}
    >
      <XAxis dataKey="time" tickFormatter={(value) => dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="spread" stroke='red' />
      {/* <Line type="monotone" dataKey="ask_spread" stroke='green' />
      <Line type="monotone" dataKey="mid_spread" stroke='blue' />
      <Line type="monotone" dataKey="bid_spread" stroke='purple' />
      <Line type="monotone" dataKey="open_margin" stroke='orange' />
      <Line type="monotone" dataKey="close_margin" stroke='black' />
      <Line type="monotone" dataKey="high_margin" stroke='green' />
      <Line type="monotone" dataKey="low_margin" stroke='yellow' /> */}
      <Line dataKey='volume' stroke='blue' />
    </LineChart>
  </div>;
};

export const InstrumentCandles = ({ instrument, granularity, candles }: { instrument: InstrumentName, granularity: CandlestickGranularity, candles: Candlestick[]; }) => {
  const id = _.uniqueId('candle-');
  return <ClientOnly>{() => <>
    <CandlesChart id={id} instrument={instrument} granularity={granularity} candles={candles} />
    <SpreadAnalysisChart id={id} instrument={instrument} granularity={granularity} candles={candles} />
  </>}</ClientOnly>;
};