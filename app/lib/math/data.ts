import {CandlesResponse, Price} from "~/components/InstrumentGrid";
import {pearsonr} from "~/lib/math/math";
import {InstrumentName} from "~/lib/oanda/type/primitives";
import {Currency} from "~/lib/oanda/currency";

export const getPearsonr = (x: CandlesResponse, y: CandlesResponse, window: number, price: Price) => {
  const x_values = x.candles.map(val => val[price]?.log_return)
  const y_values = y.candles.map(val => val[price]?.log_return)

  const result: number[] = []
  for (let index = 0; index < x.candles.length - window - 1; index++) {
    const x_part = x_values.slice(index, index + window) as number[]
    const y_part = y_values.slice(index, index + window) as number[]
    // const time = (+x.candles[index].time +  +y.candles[index].time) / 2;
    result.push(pearsonr(x_part, y_part))
  }

  return result
}

export const getPearsonrGroup = ({data, price, instruments, window, currency}: {
  data: CandlesResponse[];
  price: Price,
  instruments: InstrumentName[];
  window: number;
  currency: Currency;
}) => {
  if (instruments.length < 2) return [];

  const groups: Record<string, { x: CandlesResponse, y: CandlesResponse, pearsonr?: number[] }> = {}
  const selectedData = data.filter(d => instruments.includes(d.instrument));

  for (let index = 0; index < selectedData.length - 1; index++) {
    for (let j = index + 1; j < selectedData.length; j++) {
      const name = `${selectedData[index].instrument.replace(currency, '').replace('_', '')} : ${selectedData[j].instrument.replace(currency, '').replace('_', '')}`;
      groups[name] = {
        x: selectedData[index],
        y: selectedData[j]
      }
    }
  }

  Object.values(groups).forEach(group => {
    group.pearsonr = getPearsonr(group.x, group.y, window, price)
  })

  const result: Record<string, string | number>  [] = selectedData[0].candles.map(candle => ({time: candle.time})).slice(0, selectedData[0].candles.length - window - 1);
  Object.entries(groups).forEach(([key, value]) => {
    value.pearsonr?.forEach((value, index) => {
      result[index][key] = value
    })
  })
  return result
}