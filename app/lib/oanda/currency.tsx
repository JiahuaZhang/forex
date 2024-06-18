export const currencies = ["AUD", "CAD", "CHF", "CNH", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "JPY", "MXN", "NOK", "NZD", "PLN", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"] as const;

export type Currency = typeof currencies[number];

// uno/tailwind trick, need to have file name as tsx in order to be scanned
export const currencyIcons: Record<Currency, string> = {
  AUD: 'i-openmoji:flag-australia',
  CAD: 'i-openmoji:flag-canada',
  CHF: 'i-openmoji:flag-switzerland',
  CNH: 'i-openmoji:flag-china',
  CZK: 'i-openmoji:flag-czechia',
  DKK: 'i-openmoji:flag-denmark',
  EUR: 'i-openmoji:flag-european-union',
  GBP: 'i-openmoji:flag-united-kingdom',
  HKD: 'i-openmoji:flag-hong-kong-sar-china',
  HUF: 'i-openmoji:flag-hungary',
  JPY: 'i-openmoji:flag-japan',
  MXN: 'i-openmoji:flag-mexico',
  NOK: 'i-openmoji:flag-norway',
  NZD: 'i-openmoji:flag-new-zealand',
  PLN: 'i-openmoji:flag-poland',
  SEK: 'i-openmoji:flag-sweden',
  SGD: 'i-openmoji:flag-singapore',
  THB: 'i-openmoji:flag-thailand',
  TRY: 'i-openmoji:flag-turkey',
  USD: 'i-openmoji:flag-united-states',
  ZAR: 'i-openmoji:flag-south-africa'
};
