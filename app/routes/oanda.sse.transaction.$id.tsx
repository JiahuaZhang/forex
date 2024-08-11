import type { LoaderFunctionArgs } from '@remix-run/node';
import { getTransactionsStreamData } from '~/.server/oanda/transaction';

export const loader = async ({ request, params }: LoaderFunctionArgs) => getTransactionsStreamData(params.id as any, request.signal);