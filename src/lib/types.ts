export type Dict<T = any> = Record<string, T>;

export type TFunction<Args extends readonly any[], Result> = (...args: Args) => Result;
