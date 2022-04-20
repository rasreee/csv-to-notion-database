import { isEmptyArray } from './array';
import { isNumber } from './assertion';

export function addUp(values: number[]): number {
  if (isEmptyArray(values)) return 0;

  return values.reduce((previousValue, currentValue) => previousValue + currentValue);
}

export function round(value: number, fractionDigits?: number): number {
  if (!isNumber(fractionDigits)) return Math.round(value);

  return parseFloat(value.toFixed(fractionDigits));
}

export function calculateAverage(values: number[], fractionDigits?: number): number {
  if (isEmptyArray(values)) return 0;

  const sum = addUp(values);
  const length = values.length;

  let average = sum / length;

  if (isNumber(fractionDigits)) {
    average = round(average, fractionDigits);
  }

  return average;
}

export function countHowManyEqual(values: number[], targetValue: number): number {
  return values.filter(value => value === targetValue).length;
}
