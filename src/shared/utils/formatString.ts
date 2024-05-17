export const onlyNumbers = (str: string) => {
  const regex = /[^0-9\s]/gi;
  const value = str.replace(regex, "");
  return value;
};
