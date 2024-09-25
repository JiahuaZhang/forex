import { ActionFunctionArgs } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { DatePicker, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getCandlesAnalysis } from '~/.server/oanda/instrument';
import { currencyIcons, currencyPairs } from '~/lib/CurrencyGrid';
import { AllInstrumentName, Currency, InstrumentName } from '~/lib/oanda/type/primitives';

const currencies = Object.keys(currencyPairs);
const currencyOptions = currencies.map(value => ({ value, label: value }));
const MajorCurrency: Currency[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF'];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const instruments = formData.get('instruments') as string;
  const from = formData.get('start') as string;

  return getCandlesAnalysis({ instruments: instruments.split(',') as InstrumentName[], from });
};

const App = () => {
  const fetcher = useFetcher<typeof action>();
  const [currency, setCurrency] = useState('usd');
  const [day, setDay] = useState(dayjs().startOf('day'));
  // const [day, setDay] = useState(dayjs('2024-09-03'));
  const [time, setTime] = useState(dayjs().startOf('day'));
  // const [time, setTime] = useState(dayjs('2024-09-03 2:30:00'));
  const [instruments, setInstruments] = useState<InstrumentName[]>([]);
  const [instrumentOptions, setInstrumentOptions] = useState<Record<'value' | 'label', string>[]>([]);
  // console.log(fetcher.data);

  const submit = () => {
    if (!currency) return;

    fetcher.submit({
      instruments,
      start: `${day.format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}`
    },
      { method: 'post' }
    );
  };

  useEffect(() => {
    if (!currency) return;

    const matchedInstruments = AllInstrumentName.filter(instrument => instrument.includes(currency.toUpperCase()));
    const filterCurrency = MajorCurrency.filter(c => c !== currency.toUpperCase());
    const filteredInstruments = matchedInstruments.filter(instrument => filterCurrency.some(c => instrument.includes(c)));

    setInstruments(filteredInstruments);
    setInstrumentOptions(matchedInstruments.map(instrument => ({ value: instrument, label: instrument })));
  }, [currency]);


  return <div>
    <div un-grid='~ justify-start gap-2 items-center' un-grid-flow='col' >
      <Select un-w='40'
        showSearch
        options={currencyOptions}
        value={currency}
        onChange={setCurrency}
        labelRender={label => <div un-flex='~' un-items='center' >
          <div className={`${currencyIcons[label.value]}`} un-mr='2'></div>
          {label.label}
        </div>}
        optionRender={option => <div un-flex='~' un-items='center' >
          <div className={`${currencyIcons[option.value!]}`} un-mr='2'></div>
          {option.label}
        </div>}
      />
      <DatePicker
        value={day}
        onChange={setDay}
        disabledDate={d => d.day() === 6 || d > dayjs().endOf('day')}
      />
      <TimePicker value={time}
        use12Hours
        minuteStep={15}
        format='h:mm a'
        onChange={setTime}
      />
    </div>
    <div un-grid='~ justify-start gap-2 items-center' un-grid-flow='col' un-mt='2'>
      <Select un-min-w='72'
        mode='multiple'
        options={instrumentOptions}
        value={instruments}
        onChange={setInstruments}
        optionRender={option => {
          const [base, quote] = (option.label as string).split('_');
          return <div>
            <span un-text={`${base === currency.toUpperCase() ? 'blue-600' : ''}`} >{base}</span>
            _
            <span un-text={`${quote === currency.toUpperCase() ? 'purple-600' : ''}`} >  {quote}</span>
          </div>;
        }}
      />
      {fetcher.state === 'submitting' && <div className="i-line-md:loading-loop" un-text='blue-600' ></div>}
      {fetcher.state === 'idle' &&
        <button un-cursor='pointer' un-bg='transparent' un-border='none' un-text='lg' un-inline='grid' onClick={submit} >
          <div className="i-ic:baseline-check" ></div>
        </button>
      }
    </div>
  </div>;
};

export default App;