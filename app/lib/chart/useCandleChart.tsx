import { ChartOptions, createChart, IPriceLine } from 'lightweight-charts';
import { useEffect } from 'react';
import { Candlestick } from '../oanda/type/instrument';
import { Currency } from '../oanda/type/primitives';

export const convertCandle = (candles: Candlestick[], price: 'ask' | 'bid' | 'mid' = 'mid') => candles.map(
  candle => ({
    time: +candle.time,
    open: parseFloat(candle[price]!.o),
    high: parseFloat(candle[price]!.h),
    low: parseFloat(candle[price]!.l),
    close: parseFloat(candle[price]!.c),
    volume: candle.volume,
    complete: candle.complete
  })
);

export const useCandleChart = (id: string, currency: Currency, data: ReturnType<typeof convertCandle>) => {
  useEffect(() => {
    if (!document) return;

    // const currentLocale = window.navigator.language;
    // const myPriceFormatter = Intl.NumberFormat(currentLocale, {
    //   style: 'currency',
    //   currency
    // }).format;

    const chartOptions = {
      // layout: {
      //   background: { color: "#222" },
      //   textColor: "#C3BCDB",
      // },
      // grid: {
      //   vertLines: { color: "#444" },
      //   horzLines: { color: "#444" },
      // },
      localization: {
        dateFormat: 'yyyy-MM-dd'
      },
      timeScale: {
        timeVisible: true
      }
    } as ChartOptions;
    const chart = createChart(document.getElementById(id)!, chartOptions);

    chart.applyOptions({
      // localization: {
      //   priceFormatter: myPriceFormatter
      // },
      // crosshair: {
      //   mode: CrosshairMode.Normal,
      //   vertLine: {
      //     width: 4,
      //     color: '#C3BCDB44',
      //     style: LineStyle.Solid,
      //     labelBackgroundColor: '#9B7DFF',
      //   },
      //   horzLine: {
      //     labelBackgroundColor: '#9B7DFF',
      //   }
      // }
    });

    const mainSeries = chart.addCandlestickSeries({
      lastValueVisible: false,
    });
    mainSeries.setData(data as any);

    const volumeData = data.map(d => ({ time: d.time, value: d.volume }));
    const volumeSeries = chart.addHistogramSeries({
      priceScaleId: 'volume',
      lastValueVisible: false,
      // color: 'rgba(100, 100, 100, 0.3)',
      // priceFormat: {
      //   type: 'volume'
      // }
    });
    volumeSeries.setData(volumeData as any);

    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0
      }
    });

    chart.timeScale().fitContent();

    let lastVolumePriceLine: IPriceLine | null = null;
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) return;

      const volume = param.seriesData.get(volumeSeries);

      if (lastVolumePriceLine) {
        volumeSeries.removePriceLine(lastVolumePriceLine);
      }

      if (volume) {
        lastVolumePriceLine = volumeSeries.createPriceLine({ price: (volume as any).value });
      }

    });

    return () => chart.remove();
  }, [document]);
};

const chartOptions = {
  localization: { dateFormat: 'yyyy-MM-dd' },
  timeScale: { timeVisible: true }
} as ChartOptions;
const use1Candle = ({ valid, candles, price, container }: { valid: boolean; candles: Candlestick[]; price: 'ask' | 'mid' | 'bid'; container: string; }) => {
  useEffect(() => {
    if (!document) return;
    if (!valid) return;
    const chart = createChart(document.getElementById(container)!, chartOptions);
    console.log(chart);

    const mainSeries = chart.addCandlestickSeries({ lastValueVisible: false, });
    const data = convertCandle(candles, price);
    mainSeries.setData(data as any);
    const volumeData = data.map(d => ({ time: d.time, value: d.volume }));
    const volumeSeries = chart.addHistogramSeries({ priceScaleId: 'volume', lastValueVisible: false, });
    volumeSeries.setData(volumeData as any);
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.7, bottom: 0 } });
    chart.timeScale().fitContent();

    let lastVolumePriceLine: IPriceLine | null = null;
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) return;
      const volume = param.seriesData.get(volumeSeries);
      if (lastVolumePriceLine) {
        volumeSeries.removePriceLine(lastVolumePriceLine);
      }
      if (volume) {
        lastVolumePriceLine = volumeSeries.createPriceLine({ price: (volume as any).value });
      }
    });

    return () => chart.remove();
  }, [document, valid, candles]);
};

export const use3Candles = ({ candles, ask = 'ask', mid = 'mid', bid = 'bid' }: { candles?: Candlestick[], ask?: string, mid?: string, bid?: string; }) => {
  const hasAsk = Boolean(candles && candles[0].ask !== undefined);
  const hasBid = Boolean(candles && candles[0].bid !== undefined);
  const hasMid = Boolean(candles && candles[0].mid !== undefined);

  use1Candle({ valid: hasAsk, price: 'ask', candles: candles!, container: ask });
  use1Candle({ valid: hasBid, price: 'bid', candles: candles!, container: bid });
  use1Candle({ valid: hasMid, price: 'mid', candles: candles!, container: mid });
};