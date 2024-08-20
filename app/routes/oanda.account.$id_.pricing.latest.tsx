import type { ActionFunctionArgs } from "@remix-run/node";
import { useFetcher } from '@remix-run/react';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { getLatestCandles } from '~/.server/oanda/pricing';
import { AccountID } from '~/lib/oanda/type/account';
import { AllCandlestickGranularity, CandlestickGranularity } from '~/lib/oanda/type/instrument';
import { AllInstrumentName, AllPricingComponent, InstrumentName, PricingComponent } from '~/lib/oanda/type/primitives';

const instrumentOptions = AllInstrumentName.map(value => ({ name: value, value }));
const granularityOptions = AllCandlestickGranularity.map(value => ({ name: value, value }));
const pricingOptions = AllPricingComponent.map(value => ({ name: value, value }));

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = await request.formData();
  const instrument = data.get('instrument') as InstrumentName;
  const granularity = data.get('granularity') as CandlestickGranularity;
  const pricing = (data.get('pricing') as string).split(',') as PricingComponent[];

  return getLatestCandles({ accountID: params.id as AccountID, instrument, granularity, pricing });
};

const Latest = () => {
  const [instrument, setInstrument] = useState<InstrumentName>('GBP_USD');
  const [granularity, setGranularity] = useState<CandlestickGranularity>('H1');
  const [pricing, setPricing] = useState<PricingComponent[]>(['M']);
  const fetcher = useFetcher<typeof action>();

  return <div>
    <header un-grid='~ inline' un-gap='6' un-auto-flow='col' un-justify='start' un-items='center' >
      <span un-block='inline' un-p='1' >
        <Select un-mr='1' un-w='26' options={instrumentOptions} value={instrument} showSearch onChange={setInstrument}
          filterOption={(value, option) => option?.value.replace('_', '').toLowerCase().includes(value.replace(/[-_]/, '').toLowerCase()) ?? false}
        />
        :
        <Select un-ml='1' un-mr='1' un-w='20' options={granularityOptions} value={granularity} showSearch onChange={setGranularity} />
        :
        <Select un-ml='1' un-min-w='16' options={pricingOptions} value={pricing} onChange={setPricing} mode='multiple' />
      </span>
      {
        fetcher.state === 'loading'
        && <div className="i-line-md:loading-loop" un-text='blue-600 3xl' ></div>
      }
      {
        fetcher.state === 'idle'
        && <Button type='primary'
          icon={<div className="i-ic:baseline-check" />}
          onClick={() => {
            console.log('click on button?');
            fetcher.submit({ instrument, granularity, pricing }, { method: 'post' });
          }}
        />
      }
    </header>
    <main>
      {
        fetcher.data && JSON.stringify(fetcher.data, null, 2)
      }
    </main>
  </div >;
};

export default Latest;