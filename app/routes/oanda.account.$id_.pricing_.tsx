import { useFetcher } from '@remix-run/react';
import { Button, Descriptions, Select, Table } from 'antd';
import { useState } from 'react';
import { ActionFunctionArgs } from 'react-router';
import { getPricing } from '~/.server/oanda/pricing';
import { AccountID } from '~/lib/oanda/type/account';
import { ClientPrice } from '~/lib/oanda/type/pricing';
import { AllInstrumentName, Instrument, InstrumentName } from '~/lib/oanda/type/primitives';

const instrumentOptions = AllInstrumentName.map(value => ({ name: value, value }));

const Price = ({ price }: { price: ClientPrice; }) => {
  return <Descriptions bordered un-mx='2' un-mb='4' >
    <Descriptions.Item label='instrument' > {price.instrument}  </Descriptions.Item>
    <Descriptions.Item label='time' span={2} > {new Date(price.time).toLocaleString()}  </Descriptions.Item>
    <Descriptions.Item label='closeout bid' > {price.closeoutBid}  </Descriptions.Item>
    <Descriptions.Item label='closeout ask' > {price.closeoutAsk}  </Descriptions.Item>
    <Descriptions.Item label='status' > {price.status}  </Descriptions.Item>
    <Descriptions.Item label='tradeable' > {price.tradeable ? <div className="i-ic:baseline-check" un-text='green-6' /> : <span un-text='red-5 lg'>x</span>}  </Descriptions.Item>
    <Descriptions.Item label='quote home conversion factors positive units' > {price.quoteHomeConversionFactors?.positiveUnits}  </Descriptions.Item>
    <Descriptions.Item label='quote home conversion factors negative units' > {price.quoteHomeConversionFactors?.negativeUnits}  </Descriptions.Item>
    <Descriptions.Item label='bids' >
      <Table dataSource={price.bids} columns={[
        { title: 'price', dataIndex: 'price', key: 'price' },
        { title: 'liquidity', dataIndex: 'liquidity', key: 'liquidity' },
      ]} pagination={false} />
    </Descriptions.Item>
    <Descriptions.Item label='asks' >
      <Table dataSource={price.asks} columns={[
        { title: 'price', dataIndex: 'price', key: 'price' },
        { title: 'liquidity', dataIndex: 'liquidity', key: 'liquidity' },
      ]} pagination={false} />
    </Descriptions.Item>
  </Descriptions>;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = await request.formData();
  const instruments = data.get('instruments') as string;
  console.log(instruments);

  return getPricing({ accountID: params.id as AccountID, instruments: instruments.split(',') as InstrumentName[] });
};

const Pricing = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const fetcher = useFetcher<typeof action>();

  return <div>
    <header un-grid='~' un-grid-flow='col' un-gap='4' >
      <Select options={instrumentOptions} value={instruments} onChange={setInstruments} mode='multiple' filterOption={
        (search, option) => option?.value.replace('_', '').includes(search.replace(/[-_]/g, '').toUpperCase()) ?? false
      } />
      {
        fetcher.state === 'loading'
        && <div className="i-line-md:loading-loop" un-text='blue-600 3xl' ></div>
      }
      {
        fetcher.state === 'idle'
        && <Button type='primary'
          icon={<div className="i-ic:baseline-check" />}
          onClick={() => fetcher.submit({ instruments }, { method: 'post' })}
        />
      }
    </header>
    <main>
      {
        fetcher.data && <>
          <Descriptions un-m='2' >
            <Descriptions.Item label='Time' >  {new Date(fetcher.data.time).toLocaleString()}  </Descriptions.Item>
          </Descriptions>
          {fetcher.data.prices.map(price => <Price price={price} key={price.instrument} />)}
        </>
      }
    </main>
  </div>;
};

export default Pricing;