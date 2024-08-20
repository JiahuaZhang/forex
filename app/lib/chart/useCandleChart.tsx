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
