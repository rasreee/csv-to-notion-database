export const jsonString = (value: object): string => {
  return JSON.stringify(value, null, 2);
};

export const prettyString = (value: any) => {
  return typeof value === 'object' ? jsonString(value) : value;
};
