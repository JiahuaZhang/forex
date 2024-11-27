import {assert, expect, test} from "vitest";
import {pearsonr} from "~/lib/math/math";

test('empty case', () => {
  const result = pearsonr([], []);
  expect(result).toBeNaN()
});

test('error case', () => {
  assert.throws(() => pearsonr([], [1]));
})

test('1 case', () => {
  const result = pearsonr([1,2], [1,2]);
  expect(result).toEqual(1)
})

test('complicated case', () => {
  const result = pearsonr(
    [3.63, 3.02 , 3.82, 3.42, 3.59, 2.87, 3.03, 3.46 , 3.36, 3.30],
    [53.1 , 49.7 , 48.4 , 54.2 , 54.9 , 43.7 , 47.2 , 45.2 , 54.4 , 50.4]
  );
  expect(result).toEqual(0.4701772329684033)
})