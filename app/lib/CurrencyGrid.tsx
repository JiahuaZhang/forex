import { TradingViewWidget } from './TradingViewWidget';

const currencyPairs: Record<string, string[]> = {
  'eur': ['EURUSD', 'EURGBP', 'EURJPY', 'EURCHF'],
  'gbp': ['EURGBP', 'GBPUSD', 'GBPJPY', 'GBPCHF'],
  'usd': ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF'],
  'jpy': ['EURJPY', 'GBPJPY', 'USDJPY', 'CHFJPY'],
  'aud': ['EURAUD', 'GBPAUD', 'AUDUSD', 'AUDJPY'],
  'cad': ['EURCAD', 'GBPCAD', 'CADUSD', 'CADJPY'],
  'chf': ['EURCHF', 'USDCHF', 'GBPCHF', 'CHFJPY']
};

export const CurrencyGrid = ({ currency, interval }: { currency: string; interval: number; }) => {
  const pairs = currencyPairs[currency.trim().toLowerCase()];

  if (!pairs) {
    return <div>No currency match for {currency} </div>;
  }

  return <div un-grid='~ cols-2'>
    <div >
      <TradingViewWidget symbol={pairs[0]} interval={interval} />
      <TradingViewWidget symbol={pairs[1]} interval={interval} />
    </div>
    <div >
      <TradingViewWidget symbol={pairs[2]} interval={interval} />
      <TradingViewWidget symbol={pairs[3]} interval={interval} />
    </div>
  </div>;
};