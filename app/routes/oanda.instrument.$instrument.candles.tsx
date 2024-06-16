import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

const Candles = () => {
  return <div>
    Candle page
  </div>;
};

export default Candles;