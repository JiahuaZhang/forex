import { useEffect, useRef } from 'react';

type Props = {
  symbol: string;
  interval?: number;
  showDrawing?: boolean;
  [key: string]: any;
};

export const TradingViewWidget = ({ symbol, interval, showDrawing, ...rest }: Props = { symbol: 'EURUSD', interval: 1, showDrawing: false }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "FX:${symbol}",
          "interval": "${interval}",
          "timezone": "America/New_York",
          "theme": "light",
          "style": "1",
          "locale": "zh_CN",
          "allow_symbol_change": true,
          ${showDrawing ? '"hide_side_toolbar": false,' : ''}
          "withdateranges": true,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current?.appendChild(script);

      return () => { container.current?.contains(script) && container.current?.removeChild(script); };
    },
    []
  );

  return (
    <div  {...rest} >
      <div className="tradingview-widget-container" ref={container}   >
        <div className="tradingview-widget-container__widget" ></div>
      </div>
    </div>
  );
};