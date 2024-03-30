import { useEffect, useRef } from 'react';

type Props = {
  symbol: string;
  interval?: number;
};

export const TradingViewWidget = ({ symbol, interval }: Props = { symbol: 'EURUSD', interval: 1 }) => {
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
          "withdateranges": true,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current?.appendChild(script);

      return () => { container.current?.contains(script) && container.current?.removeChild(script); };
    },
    []
  );

  return (
    <div un-h='96' >
      <div className="tradingview-widget-container" ref={container}   >
        <div className="tradingview-widget-container__widget" ></div>
      </div>
    </div>
  );
};