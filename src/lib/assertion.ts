export const __TEST__ = process.env.NODE_ENV === 'test';
export const __PROD__ = process.env.NODE_ENV === 'production';

export const __VERBOSE__ = process.env.VERBOSE === 'true' ;

export function isNumber(o: any): o is number {
  return typeof o === 'number';
}

export function isEmptyString(s: string): boolean {
  return s === '';
}

export function isNonEmptyString(s: string): boolean {
  return !isEmptyString(s);
}

export function isString(o: any): o is string {
  return typeof o === 'string';
}
