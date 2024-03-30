import { useEffect, useState } from 'react';
import { CurrencyGrid } from '~/lib/CurrencyGrid';

const Grid = () => {
  const [currency, setCurrency] = useState('');
  const [interval, setInterval] = useState('1');

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
    <div>
      <CurrencyGrid key={interval} currency={currency} interval={Number(interval)} />
      <div un-float='right' un-grid='~ flow-col auto-cols-min gap-x-4'>
        <input
          type="text"
          value={currency}
          onChange={event => setCurrency(event.target.value)}
          placeholder="Enter currency code (e.g., USD, EUR)"
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
              value={30}
              checked={interval === '30'}
              onChange={event => setInterval(event.target.value)}
            />
            30
          </label>
        </form>
      </div>
    </div>

  );
};

export default Grid;
