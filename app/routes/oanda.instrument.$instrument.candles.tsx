import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Suspense, useEffect } from 'react';
import { getCandles } from '~/.server/oanda/instrument';
import { createChart, ChartOptions, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useLoaderData, useParams } from '@remix-run/react';
import { Candlestick } from '~/.server/oanda/type/instrument';
import { Currency } from '~/.server/oanda/type/primitives';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getCandles({
    instrument: params.instrument as any
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

const convertCandle = (candles: Candlestick[], price: 'ask' | 'bid' | 'mid' = 'mid') => candles.map(
  candle => ({
    time: +candle.time,
    open: parseFloat(candle[price].o),
    high: parseFloat(candle[price].h),
    low: parseFloat(candle[price].l),
    close: parseFloat(candle[price].c),
    volume: candle.volume,
    complete: candle.complete
  })
);

const useCandleChart = (id: string, currency: Currency, data: ReturnType<typeof convertCandle>) => {
  useEffect(() => {
    if (!document) return;

    const currentLocale = window.navigator.language;
    const myPriceFormatter = Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currency
    }).format;

    const chartOptions = {
      // layout: {
      //   background: { color: "#222" },
      //   textColor: "#C3BCDB",
      // },
      // grid: {
      //   vertLines: { color: "#444" },
      //   horzLines: { color: "#444" },
      // },
    } as ChartOptions;
    const chart = createChart(document.getElementById(id)!, chartOptions);

    chart.applyOptions({
      localization: {
        priceFormatter: myPriceFormatter
      },
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
      lastValueVisible: false
    });
    mainSeries.setData(data as any);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [document]);
};

const Candles = () => {
  const { instrument } = useParams();
  const data = useLoaderData<typeof loader>();
  const candles = convertCandle(data.candles);
  useCandleChart('container', instrument?.split('_')[1] as Currency, candles);

  return <div id='container' un-h='96' >
    hello
  </div>;
};

export default () => <Suspense>
  <Candles />
</Suspense>;