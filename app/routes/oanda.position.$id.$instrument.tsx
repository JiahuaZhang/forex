import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import { Descriptions } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { getInstrumentPosition } from '~/.server/oanda/position';
import { InstrumentName } from '~/.server/oanda/type/primitives';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getInstrumentPosition({ accountID: params.id as any, instrument: params.instrument as InstrumentName });
};

const Positions = () => {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const { position } = data;

  const items = [
    {
      children: position.instrument,
      label: 'instrument',
      key: 'instrument',
    },
    {
      children: position.pl,
      label: 'profit & loss',
      key: 'pl'
    },
    {
      children: position.unrealizedPL,
      label: 'unrealized profit & loss',
      key: 'unrealizedPL'
    },
    {
      children: position.commission,
      label: 'commission',
      key: 'commission'
    },
    {
      children: <section un-m='[&>p]:0'>
        <p>
          units: {position.long.units}
        </p>
        <p>
          profit & loss: {position.long.pl}
        </p>
        <p>
          unrealized profit & loss: {position.long.unrealizedPL}
        </p>
        <p>
          dividend adjustment: {position.long.dividendAdjustment}
        </p>
        <p>
          financing: {position.long.financing}
        </p>
        <p>
          guaranteed execution fees: {position.long.guaranteedExecutionFees}
        </p>
        <p>
          resettable profit & loss: {position.long.resettablePL}
        </p>
      </section>,
      label: 'long',
      key: 'long',
      span: 2
    },
    {
      children: position.dividendAdjustment,
      label: 'dividend adjustment',
      key: 'dividendAdjustment'
    },
    {
      children: <section un-m='[&>p]:0' >
        <p>
          units: {position.short.units}
        </p>
        <p>
          profit & loss: {position.short.pl}
        </p>
        <p>
          unrealized profit & loss: {position.short.unrealizedPL}
        </p>
        <p>
          dividend adjustment: {position.short.dividendAdjustment}
        </p>
        <p>
          financing: {position.short.financing}
        </p>
        <p>
          guaranteed execution fees: {position.short.guaranteedExecutionFees}
        </p>
        <p>
          resettable profit & loss: {position.short.resettablePL}
        </p>
      </section>,
      label: 'short',
      key: 'short',
      span: 2
    },
    {
      children: position.financing,
      label: 'financing',
      key: 'financing'
    },
    {
      children: position.guaranteedExecutionFees,
      label: 'guaranteede execution fees',
      key: 'guaranteedExecutionFees'
    },
    {
      children: position.resettablePL,
      label: 'resettable profit & loss',
      key: 'resettablePL'
    },
  ] as DescriptionsItemType[];

  return <Descriptions un-m='2' items={items} bordered />;
};

export default Positions;