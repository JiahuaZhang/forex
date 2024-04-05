import { TradingViewWidget } from './TradingViewWidget';

const currencyPairs: Record<string, string[]> = {
  'eur': ['EURUSD', 'EURGBP', 'EURJPY', 'EURCHF'],
  'gbp': ['EURGBP', 'GBPUSD', 'GBPJPY', 'GBPCHF'],
  'usd': ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF'],
  'jpy': ['EURJPY', 'GBPJPY', 'USDJPY', 'CHFJPY'],
  'aud': ['EURAUD', 'GBPAUD', 'AUDUSD', 'AUDJPY'],
  'cad': ['EURCAD', 'GBPCAD', 'USDCAD', 'CADJPY'],
  'chf': ['EURCHF', 'USDCHF', 'GBPCHF', 'CHFJPY']
};

export const CurrencyGrid = ({ currency, interval, showDrawing, ...rest }: { currency: string; interval: number; showDrawing: boolean; }) => {
  const pairs = currencyPairs[currency.trim().toLowerCase()];

  if (!pairs) {
    return <div {...rest} >No currency match for {currency} </div>;
  }

  return <div un-grid='~ cols-2' {...rest} >
    <div >
      <TradingViewWidget un-h='1/2' symbol={pairs[0]} interval={interval} showDrawing={showDrawing} />
      <TradingViewWidget un-h='1/2' symbol={pairs[1]} interval={interval} showDrawing={showDrawing} />
    </div>
    <div >
      <TradingViewWidget un-h='1/2' symbol={pairs[2]} interval={interval} showDrawing={showDrawing} />
      <TradingViewWidget un-h='1/2' symbol={pairs[3]} interval={interval} showDrawing={showDrawing} />
    </div>
  </div>;
};