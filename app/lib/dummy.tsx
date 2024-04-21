import { render } from 'react-dom';
import { ForexValue } from './type';

export const data: ForexValue[] = [
  {
    "datetime": "2024-04-16 14:00:00",
    "open": "1.46800",
    "high": "1.46850",
    "low": "1.46740",
    "close": "1.46810",
    "previous_close": "1.46790"
  },
  {
    "datetime": "2024-04-16 13:00:00",
    "open": "1.46870",
    "high": "1.46880",
    "low": "1.46740",
    "close": "1.46790",
    "previous_close": "1.46860"
  },
  {
    "datetime": "2024-04-16 12:00:00",
    "open": "1.46930",
    "high": "1.46930",
    "low": "1.46800",
    "close": "1.46860",
    "previous_close": "1.46950"
  },
  {
    "datetime": "2024-04-16 11:00:00",
    "open": "1.47010",
    "high": "1.47040",
    "low": "1.46810",
    "close": "1.46950",
    "previous_close": "1.47020"
  },
  {
    "datetime": "2024-04-16 10:00:00",
    "open": "1.47140",
    "high": "1.47300",
    "low": "1.46990",
    "close": "1.47020",
    "previous_close": "1.47130"
  },
  {
    "datetime": "2024-04-16 09:00:00",
    "open": "1.47010",
    "high": "1.47060",
    "low": "1.46990",
    "close": "1.47030",
    "previous_close": "1.47000"
  },
  {
    "datetime": "2024-04-16 08:55:00",
    "open": "1.47010",
    "high": "1.47040",
    "low": "1.46970",
    "close": "1.47000",
    "previous_close": "1.47020"
  },
  {
    "datetime": "2024-04-16 08:50:00",
    "open": "1.47050",
    "high": "1.47066",
    "low": "1.46990",
    "close": "1.47020",
    "previous_close": "1.47060"
  },
  {
    "datetime": "2024-04-16 08:45:00",
    "open": "1.47030",
    "high": "1.47100",
    "low": "1.47020",
    "close": "1.47060",
    "previous_close": "1.47030"
  },
  {
    "datetime": "2024-04-16 08:40:00",
    "open": "1.47111",
    "high": "1.47111",
    "low": "1.47020",
    "close": "1.47030",
    "previous_close": "1.47110"
  },
  {
    "datetime": "2024-04-16 08:35:00",
    "open": "1.47130",
    "high": "1.47180",
    "low": "1.47070",
    "close": "1.47110",
    "previous_close": "1.47130"
  },
  {
    "datetime": "2024-04-16 08:33:00",
    "open": "1.47110",
    "high": "1.47140",
    "low": "1.47090",
    "close": "1.47140",
    "previous_close": "1.47120"
  },
  {
    "datetime": "2024-04-16 08:32:00",
    "open": "1.47100",
    "high": "1.47140",
    "low": "1.47100",
    "close": "1.47120",
    "previous_close": "1.47090"
  },
  {
    "datetime": "2024-04-16 08:31:00",
    "open": "1.47030",
    "high": "1.47110",
    "low": "1.46970",
    "close": "1.47090",
    "previous_close": "1.46980"
  },
  {
    "datetime": "2024-04-16 08:30:00",
    "open": "1.46610",
    "high": "1.47040",
    "low": "1.46610",
    "close": "1.46980",
    "previous_close": "1.46630"
  }
];

export const column = [
  {
    title: 'Datetime',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: 'Time Difference',
    dataIndex: 'time_difference',
    key: 'time_difference',
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
  },
  {
    title: 'High',
    dataIndex: 'high',
    key: 'high',
  },
  {
    title: 'Low',
    dataIndex: 'low',
    key: 'low',
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
  },
  {
    title: 'difference',
    dataIndex: 'difference',
    key: 'difference',
  },
  {
    title: 'change',
    dataIndex: 'change',
    key: 'change',
  },
  {
    title: 'peak_difference',
    dataIndex: 'peak_difference',
    key: 'peak_difference',
  },
  {
    title: 'progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (value: number) => {
      return value >= 90 ? <span un-bg='blue-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >{value}</span> : value;
    }
  },
  {
    title: 'is_extreme',
    dataIndex: 'is_extreme',
    key: 'is_extreme',
    render: (value: boolean) => {
      return value ? <span un-bg='green-600' un-p='2' un-py='1' un-text='white' un-rounded='~' >Yes</span> : 'No';
    }
  }
];