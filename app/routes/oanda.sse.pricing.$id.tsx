import { LoaderFunctionArgs } from '@remix-run/node';
import { getPricingStream } from '~/.server/oanda/pricing';
import { InstrumentName } from '~/lib/oanda/type/primitives';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const instruments = url.searchParams.get('instruments');

  return getPricingStream({
    accountID: params.id as any,
    signal: request.signal,
    instruments: instruments ? instruments.split(',') as InstrumentName[] : [],
    snapshot: url.searchParams.get('snapshot') === 'true',
  });
};