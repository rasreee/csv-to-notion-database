import { prettyString } from './pretty';
import { Dict, TFunction } from './types';

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (..._args: any[]): any => {};

export function runIf<Args extends any[], Return>(
  predicate: boolean,
  fn: TFunction<Args, Return>,
  ...args: Args
): false | ReturnType<TFunction<Args, Return>> {
  return predicate && fn(...args);
}

export const functionString = (name: string, args: Dict) => {
  return `${name}(${Object.entries(args)
    .map(([key, value]) => `${key}: ${prettyString(value)}`)
    .join(', ')})`;
};
