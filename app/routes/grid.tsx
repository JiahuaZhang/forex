import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { CurrencyGrid, currencyIcons, currencyPairs } from '~/lib/CurrencyGrid';

const currencies = Object.keys(currencyPairs);
const currencyOptions = currencies.map(value => ({ value, label: value }));

const Grid = () => {
  const [currency, setCurrency] = useState('');
  const [interval, setInterval] = useState('1');
  const [showDrawingToolbar, setShowDrawingToolbar] = useState(false);

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

  return (
    <div un-h='[calc(100vh-4px)]' >
      <style>
        {
          `body {
            margin: 0;
          }`
        }
      </style>
      <div un-grid='~ flow-col auto-cols-min gap-x-4 items-center' un-m='1'>
        <Select un-w='40'
          options={currencyOptions}
          onChange={setCurrency}
          value={currency}
          labelRender={label => <div un-flex='~' un-items='center' >
            <div className={`${currencyIcons[label.value]}`} un-mr='2'></div>
            {label.label}
          </div>}
          optionRender={option => <div un-flex='~' un-items='center' >
            <div className={`${currencyIcons[option.value!]}`} un-mr='2'></div>
            {option.label}
          </div>}
          size='small'
        />
        <form un-grid='~ flow-col auto-cols-max gap-x-4' >
          <label  >
            <input
              type="radio"
              name="value"
              value={1}
              checked={interval === '1'}
              onChange={event => setInterval(event.target.value)}
            />
            1
          </label>
          <label  >
            <input
              type="radio"
              name="value"
              value={15}
              checked={interval === '15'}
              onChange={event => setInterval(event.target.value)}
            />
            15
          </label>
          <label  >
            <input
              type="radio"
              name="value"
              value={30}
              checked={interval === '30'}
              onChange={event => setInterval(event.target.value)}
            />
            30
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDrawingToolbar}
              onChange={event => setShowDrawingToolbar(event.target.checked)}
            />
            Show Drawing Tool Bar
          </label>
        </form>
      </div>
      <CurrencyGrid un-h='[calc(100%-28px)]'
        key={`${currency}-${interval}-${showDrawingToolbar}`}
        showDrawing={showDrawingToolbar}
        currency={currency}
        interval={Number(interval)} />
    </div>
  );
};

export default Grid;