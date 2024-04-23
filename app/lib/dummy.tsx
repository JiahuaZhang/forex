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

export const pairs = [
  {
    "pair": "EUR/CAD",
    "values": [
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
    ]
  },
  {
    "pair": "GBP/CAD",
    "values": [
      {
        "datetime": "2024-04-16 14:00:00",
        "open": "1.71780",
        "high": "1.71880",
        "low": "1.71760",
        "close": "1.71780",
        "previous_close": "1.71770"
      },
      {
        "datetime": "2024-04-16 13:00:00",
        "open": "1.71890",
        "high": "1.71910",
        "low": "1.71720",
        "close": "1.71770",
        "previous_close": "1.71890"
      },
      {
        "datetime": "2024-04-16 12:00:00",
        "open": "1.71930",
        "high": "1.71930",
        "low": "1.71750",
        "close": "1.71890",
        "previous_close": "1.71930"
      },
      {
        "datetime": "2024-04-16 11:00:00",
        "open": "1.72060",
        "high": "1.72080",
        "low": "1.71800",
        "close": "1.71930",
        "previous_close": "1.72050"
      },
      {
        "datetime": "2024-04-16 10:00:00",
        "open": "1.72350",
        "high": "1.72395",
        "low": "1.72040",
        "close": "1.72050",
        "previous_close": "1.72340"
      },
      {
        "datetime": "2024-04-16 09:00:00",
        "open": "1.72170",
        "high": "1.72210",
        "low": "1.72150",
        "close": "1.72190",
        "previous_close": "1.72170"
      },
      {
        "datetime": "2024-04-16 08:55:00",
        "open": "1.72200",
        "high": "1.72220",
        "low": "1.72150",
        "close": "1.72170",
        "previous_close": "1.72210"
      },
      {
        "datetime": "2024-04-16 08:50:00",
        "open": "1.72240",
        "high": "1.72248",
        "low": "1.72170",
        "close": "1.72210",
        "previous_close": "1.72250"
      },
      {
        "datetime": "2024-04-16 08:45:00",
        "open": "1.72160",
        "high": "1.72275",
        "low": "1.72140",
        "close": "1.72250",
        "previous_close": "1.72160"
      },
      {
        "datetime": "2024-04-16 08:40:00",
        "open": "1.72220",
        "high": "1.72220",
        "low": "1.72110",
        "close": "1.72160",
        "previous_close": "1.72220"
      },
      {
        "datetime": "2024-04-16 08:35:00",
        "open": "1.72240",
        "high": "1.72280",
        "low": "1.72180",
        "close": "1.72220",
        "previous_close": "1.72250"
      },
      {
        "datetime": "2024-04-16 08:33:00",
        "open": "1.72190",
        "high": "1.72240",
        "low": "1.72180",
        "close": "1.72230",
        "previous_close": "1.72190"
      },
      {
        "datetime": "2024-04-16 08:32:00",
        "open": "1.72200",
        "high": "1.72210",
        "low": "1.72180",
        "close": "1.72190",
        "previous_close": "1.72180"
      },
      {
        "datetime": "2024-04-16 08:31:00",
        "open": "1.72020",
        "high": "1.72180",
        "low": "1.72010",
        "close": "1.72180",
        "previous_close": "1.72010"
      },
      {
        "datetime": "2024-04-16 08:30:00",
        "open": "1.71630",
        "high": "1.72053",
        "low": "1.71630",
        "close": "1.72010",
        "previous_close": "1.71630"
      }
    ]
  },
  {
    "pair": "USD/CAD",
    "values": [
      {
        "datetime": "2024-04-16 14:00:00",
        "open": "1.38210",
        "high": "1.38300",
        "low": "1.38020",
        "close": "1.38100",
        "previous_close": "1.38210"
      },
      {
        "datetime": "2024-04-16 13:00:00",
        "open": "1.38220",
        "high": "1.38460",
        "low": "1.38170",
        "close": "1.38210",
        "previous_close": "1.38220"
      },
      {
        "datetime": "2024-04-16 12:00:00",
        "open": "1.38250",
        "high": "1.38280",
        "low": "1.38170",
        "close": "1.38220",
        "previous_close": "1.38270"
      },
      {
        "datetime": "2024-04-16 11:00:00",
        "open": "1.38280",
        "high": "1.38280",
        "low": "1.38120",
        "close": "1.38270",
        "previous_close": "1.38280"
      },
      {
        "datetime": "2024-04-16 10:00:00",
        "open": "1.38430",
        "high": "1.38465",
        "low": "1.38260",
        "close": "1.38280",
        "previous_close": "1.38400"
      },
      {
        "datetime": "2024-04-16 09:00:00",
        "open": "1.38185",
        "high": "1.38250",
        "low": "1.38185",
        "close": "1.38230",
        "previous_close": "1.38180"
      },
      {
        "datetime": "2024-04-16 08:55:00",
        "open": "1.38150",
        "high": "1.38195",
        "low": "1.38120",
        "close": "1.38180",
        "previous_close": "1.38160"
      },
      {
        "datetime": "2024-04-16 08:50:00",
        "open": "1.38160",
        "high": "1.38170",
        "low": "1.38130",
        "close": "1.38160",
        "previous_close": "1.38170"
      },
      {
        "datetime": "2024-04-16 08:45:00",
        "open": "1.38080",
        "high": "1.38205",
        "low": "1.38070",
        "close": "1.38170",
        "previous_close": "1.38070"
      },
      {
        "datetime": "2024-04-16 08:40:00",
        "open": "1.38110",
        "high": "1.38130",
        "low": "1.38070",
        "close": "1.38070",
        "previous_close": "1.38110"
      },
      {
        "datetime": "2024-04-16 08:35:00",
        "open": "1.38210",
        "high": "1.38220",
        "low": "1.38070",
        "close": "1.38110",
        "previous_close": "1.38210"
      },
      {
        "datetime": "2024-04-16 08:33:00",
        "open": "1.38195",
        "high": "1.38225",
        "low": "1.38195",
        "close": "1.38220",
        "previous_close": "1.38200"
      },
      {
        "datetime": "2024-04-16 08:32:00",
        "open": "1.38220",
        "high": "1.38220",
        "low": "1.38190",
        "close": "1.38200",
        "previous_close": "1.38215"
      },
      {
        "datetime": "2024-04-16 08:31:00",
        "open": "1.38190",
        "high": "1.38225",
        "low": "1.38180",
        "close": "1.38215",
        "previous_close": "1.38190"
      },
      {
        "datetime": "2024-04-16 08:30:00",
        "open": "1.37930",
        "high": "1.38200",
        "low": "1.37925",
        "close": "1.38190",
        "previous_close": "1.37800"
      }
    ]
  },
  {
    "pair": "CAD/JPY",
    "values": [
      {
        "datetime": "2024-04-16 14:00:00",
        "open": "111.93800",
        "high": "112.03000",
        "low": "111.85500",
        "close": "111.98100",
        "previous_close": "111.94000"
      },
      {
        "datetime": "2024-04-16 13:00:00",
        "open": "111.83650",
        "high": "111.94000",
        "low": "111.78000",
        "close": "111.94000",
        "previous_close": "111.83000"
      },
      {
        "datetime": "2024-04-16 12:00:00",
        "open": "111.81000",
        "high": "111.91000",
        "low": "111.79750",
        "close": "111.83000",
        "previous_close": "111.80000"
      },
      {
        "datetime": "2024-04-16 11:00:00",
        "open": "111.81000",
        "high": "111.92000",
        "low": "111.75000",
        "close": "111.80000",
        "previous_close": "111.78000"
      },
      {
        "datetime": "2024-04-16 10:00:00",
        "open": "111.66800",
        "high": "111.86000",
        "low": "111.62000",
        "close": "111.78000",
        "previous_close": "111.69000"
      },
      {
        "datetime": "2024-04-16 09:00:00",
        "open": "111.92000",
        "high": "111.94000",
        "low": "111.89000",
        "close": "111.94000",
        "previous_close": "111.92000"
      },
      {
        "datetime": "2024-04-16 08:55:00",
        "open": "111.97000",
        "high": "111.97000",
        "low": "111.92000",
        "close": "111.92000",
        "previous_close": "111.95850"
      },
      {
        "datetime": "2024-04-16 08:50:00",
        "open": "111.92000",
        "high": "111.97000",
        "low": "111.92000",
        "close": "111.95850",
        "previous_close": "111.91000"
      },
      {
        "datetime": "2024-04-16 08:45:00",
        "open": "111.95700",
        "high": "111.95700",
        "low": "111.88000",
        "close": "111.91000",
        "previous_close": "111.95000"
      },
      {
        "datetime": "2024-04-16 08:40:00",
        "open": "111.92000",
        "high": "111.98000",
        "low": "111.92000",
        "close": "111.95000",
        "previous_close": "111.92000"
      },
      {
        "datetime": "2024-04-16 08:35:00",
        "open": "111.86000",
        "high": "111.95000",
        "low": "111.85850",
        "close": "111.92000",
        "previous_close": "111.86000"
      },
      {
        "datetime": "2024-04-16 08:33:00",
        "open": "111.89000",
        "high": "111.89000",
        "low": "111.86000",
        "close": "111.86000",
        "previous_close": "111.89000"
      },
      {
        "datetime": "2024-04-16 08:32:00",
        "open": "111.86000",
        "high": "111.89000",
        "low": "111.84000",
        "close": "111.89000",
        "previous_close": "111.86000"
      },
      {
        "datetime": "2024-04-16 08:31:00",
        "open": "111.94000",
        "high": "111.94000",
        "low": "111.86000",
        "close": "111.86000",
        "previous_close": "111.94000"
      },
      {
        "datetime": "2024-04-16 08:30:00",
        "open": "112.19000",
        "high": "112.19000",
        "low": "111.91000",
        "close": "111.94000",
        "previous_close": "112.23000"
      }
    ]
  }
];