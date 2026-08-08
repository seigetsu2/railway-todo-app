export const UTCToLocal = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  const offset = date.getTimezoneOffset();
  const local = new Date(new Date(date).getTime() - offset * 60 * 1000);
  return local;
};
