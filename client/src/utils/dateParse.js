export const convertStringToUnix = (str) => {
  if (!str) {
    return null;
  }

  const date = new Date(str);
  const unix = date.getTime();
  return unix;
};
