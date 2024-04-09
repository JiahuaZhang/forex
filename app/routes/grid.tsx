import { useEffect, useState } from 'react';
import { CurrencyGrid } from '~/lib/CurrencyGrid';

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
    <div un-h='[calc(100vh-16px)]' >
      <CurrencyGrid un-h='[calc(100%-21px)]' key={`${interval}-${showDrawingToolbar}`} showDrawing={showDrawingToolbar} currency={currency} interval={Number(interval)} />
      <div un-grid='~ flow-col auto-cols-min gap-x-4 justify-end'>
        <input un-min-w='60'
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
    </div>

  );
};

export default Grid;