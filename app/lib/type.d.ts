export type ForexPair = {
  symbol: `${string}/${string}`;
  currency_group: string;
  currency_base: string;
  currency_quote: string;
};

export type ExchangeRate = {
  symbol: `${string}/${string}`;
  rate: number;
  timestamp: number;
};

export type ForexValue = {
  datetime: `${number}-${number}-${number}` | `${number}-${number}-${number} ${number}:${number}:${number}`;
  open: string;
  high: string;
  low: string;
  close: string;
  previous_close?: string;
};

export type ForexMeta = {
  symbol: `${string}/${string}`;
  interval: string;
  currency_base: string;
  currency_quote: string;
  type: string;
};

export type ForexSeries = {
  meta: ForexMeta;
  values: ForexValue[];
  status: string;
};