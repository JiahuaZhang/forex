import type { ActionFunctionArgs } from "@remix-run/node";
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { CandleSpecification } from '~/.server/oanda/pricing';
import { AllCandlestickGranularity, CandlestickGranularity } from '~/lib/oanda/type/instrument';
import { AllInstrumentName, AllPricingComponent, InstrumentName, PricingComponent } from '~/lib/oanda/type/primitives';

const instrumentOptions = AllInstrumentName.map(value => ({ name: value, value }));
const granularityOptions = AllCandlestickGranularity.map(value => ({ name: value, value }));
const pricingOptions = AllPricingComponent.map(value => ({ name: value, value }));

export const action = async ({ params }: ActionFunctionArgs) => {
  return null;
};

const Specification = ({ value, update, remove }: { value: CandleSpecification; update: (text: CandleSpecification) => void; remove?: () => void; }) => {
  const [first, second, third] = value.split(':');
  const [instrument, setInstrument] = useState<InstrumentName>(first as InstrumentName);
  const [granularity, setGranularity] = useState<CandlestickGranularity>(second as CandlestickGranularity);
  const [pricing, setPricing] = useState<PricingComponent[]>(third.split('') as PricingComponent[]);

  useEffect(() => { update(`${instrument}:${granularity}:${pricing.join('')}` as CandleSpecification); }, [instrument, granularity, pricing]);

  return <span un-block='inline' un-border='2 solid blue-4 rounded' un-p='1' >
    <Select un-mr='1' un-w='26' options={instrumentOptions} value={instrument} showSearch onChange={setInstrument}
      filterOption={(value, option) =>
        option?.value.replace('_', '').toLowerCase().includes(value.replace(/[-_]/, '').toLowerCase()) ?? false
      }
    />
    :
    <Select un-ml='1' un-mr='1' un-w='20' options={granularityOptions} value={granularity} showSearch onChange={setGranularity} />
    :
    <Select un-ml='1' un-min-w='16' options={pricingOptions} value={pricing} onChange={setPricing} mode='multiple' />

    {
      remove &&
      <div un-ml='2'
        un-mb='2'
        un-cursor='pointer'
        un-hover='text-red-5'
        className="i-ic:baseline-delete"
        onClick={remove}></div>
    }
  </span>;
};

const Latest = () => {
  const [query, setQuery] = useState<CandleSpecification[]>(['GBP_USD:H1:M']);

  return <div>
    <header un-flex='~ wrap' un-gap='1'  >
      {
        query.map((q, index) => <Specification value={q} key={`${index}-${q}`}
          update={value => setQuery(prev => {
            const values = [...prev];
            values[index] = value;
            return values;
          })}
          remove={query.length > 1
            ? () => setQuery(prev => ([...prev.slice(0, index), ...prev.slice(index + 1)]))
            : undefined}
        />)
      }
      <Button type='primary' un-self='center'
        icon={<div un-w='6' un-h='6' className="i-ic:baseline-add"></div>}
        onClick={() => setQuery(prev => ([...prev, 'GBP_USD:H1:M']))}
      />
    </header>
  </div >;
};

export default Latest;