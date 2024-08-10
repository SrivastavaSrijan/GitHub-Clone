export const getValueFromEnum = <T extends Record<string, string | number>>(
  Enum: T,
  value: string | number
): T[keyof T] | undefined => {
  if (Object.values(Enum).includes(value)) {
    return value as T[keyof T];
  }
  return undefined;
};
