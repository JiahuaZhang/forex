import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Popover, Select } from 'antd';
import { Suspense, useState } from 'react';
import { getInstruments } from '~/.server/oanda/account';
import { Currency, currencies, currencyIcons } from '~/lib/oanda/currency';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return getInstruments(params.id!);
};

const currencyOptions = currencies.map(value => ({ value, label: value }));

const Page = () => {
  const data = useLoaderData<typeof loader>();
  const [currency, setCurrency] = useState('');

  return <div>
    <Select un-w='40'
      allowClear
      options={currencyOptions}
      onChange={setCurrency}
      value={currency}
      showSearch
      labelRender={label => <div un-flex='~' un-items='center' >
        <div className={`${currencyIcons[label.value as Currency]}`} un-mr='2'></div>
        {label.label}
      </div>}
      optionRender={option => <div un-flex='~' un-items='center' >
        <div className={`${currencyIcons[option.value as Currency]}`} un-mr='2'></div>
        {option.label}
      </div>}
      size='small'
    />

    <div un-grid='~' un-grid-cols='[repeat(auto-fit,_minmax(6em,_1fr))]' un-gap='2' un-mx='6' un-my='6' >
      {
        data.instruments
          .filter(instrument => !currency || instrument.name.includes(currency))
          .map(instrument => <Popover key={instrument.name} content={<pre un-h='96' un-overflow-y='auto' >
            {JSON.stringify(instrument, null, 2)}
          </pre>} >
            <Link to={`/oanda/instrument/${instrument.name}/candles`} > {instrument.name} </Link>
          </Popover>
          )
      }
    </div>

    <div>
      Last Trasnaction id: {data.lastTransactionID}
    </div>
  </div>;
};

export default () => <Suspense>
  <Page />
</Suspense>;
