import BigNumber from "bignumber.js";
import oandaAccountId_Summary from "~/routes/oanda.account.$id_.summary";

export const pearsonr = (x: number[], y: number[]) => {
  const length = x.length;
  if (length !== y.length) throw new Error("Data needs to have same dimensions");

  const a = x.map(val => BigNumber(val))
  const b = y.map(val => BigNumber(val))

  const a_square = a.map(val => val.pow(2));
  const b_square = b.map(val => val.pow(2))
  const ab_cross = a.map( (val, index) => val.multipliedBy(b[index]) );

  const a_sum = a.reduce( (prev, curr) => prev.plus(curr), BigNumber(0) )
  const b_sum = b.reduce( (prev, curr) => prev.plus(curr), BigNumber(0) )

  const a_square_sum = a_square.reduce( (prev, curr) => prev.plus(curr), BigNumber(0) )
  const b_square_sum = b_square.reduce( (prev, curr) => prev.plus(curr), BigNumber(0) )

  const ab_cross_sum = ab_cross.reduce( (prev, curr) => prev.plus(curr), BigNumber(0) )

  const numerator_ = ab_cross_sum.multipliedBy(length).minus(
    a_sum.multipliedBy(b_sum)
  );
  const a_part = a_square_sum.multipliedBy(length).minus(
    a_sum.pow(2)
  );
  const b_part = b_square_sum.multipliedBy(length).minus(
    b_sum.pow(2)
  )
  const denominator_ = a_part.multipliedBy(b_part).sqrt();
  return numerator_.dividedBy(denominator_).toNumber();

  // const x_square = x.map(val => val * val);
  // const y_square = y.map(val => val * val);
  // const cross = x.map((val, index) => val * y[index]);
  //
  // const x_sum = x.reduce((a, b) => a + b, 0);
  // const y_sum = y.reduce((a, b) => a + b, 0);
  //
  // const x_square_sum = x_square.reduce((a, b) => a + b, 0);
  // const y_square_sum = y_square.reduce((a, b) => a + b, 0);
  //
  // const cross_sum = cross.reduce((a, b) => a + b, 0);
  //
  // const numerator = length * cross_sum  - (x_sum * y_sum);
  // const x_part = length * x_square_sum - (x_sum * x_sum);
  // const y_part = length* y_square_sum - (y_sum * y_sum);
  // const denominator = Math.sqrt(x_part * y_part);
  //
  // return numerator / denominator;
}