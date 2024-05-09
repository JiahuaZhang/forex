import { Link } from '@remix-run/react';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { currencyIcons, currencyPairs } from '~/lib/CurrencyGrid';

const currencies = Object.keys(currencyPairs);
const currencyOptions = currencies.map(value => ({ value, label: value }));

const Page = () => {
  const [currency, setCurrency] = useState('');
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlCurrency = queryParams.get('currency');

    if (urlCurrency) {
      setCurrency(urlCurrency);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (currency) {
      queryParams.set('currency', currency);
    } else {
      queryParams.delete('currency');
    }

    window.history.pushState({}, '', `${window.location.pathname}?${queryParams}`);
  }, [currency]);

  useEffect(() => {
    if (!currency) return;

    setSymbols(currencyPairs[currency]);

  }, [currency]);

  return <div>
    <Select un-w='40'
      options={currencyOptions}
      onChange={setCurrency}
      value={currency}
      showSearch
      labelRender={label => <div un-flex='~' un-items='center' >
        <div className={`${currencyIcons[label.value]}`} un-mr='2'></div>
        {label.label}
      </div>}
      optionRender={option => <div un-flex='~' un-items='center' >
        <div className={`${currencyIcons[option.value!]}`} un-mr='2'></div>
        {option.label}
      </div>}
    />

    <ul un-list='none' un-mt='8' un-grid='~' un-gap='4'  >
      {symbols.map(symbol => <li key={symbol} >
        <Link to={`/range/${symbol.slice(0, 3)}/${symbol.slice(3)}`} >
          {symbol.slice(0, 3)}/{symbol.slice(3)}
        </Link>
      </li>)}
    </ul>
  </div>;
};

export default Page;