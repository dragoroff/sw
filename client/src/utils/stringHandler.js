export const getIdFromUrl = (char) => {
  if (!char.url) {
    return null;
  }

  const arr = char.url.split("/");
  const id = arr[arr.length - 2];
  return id;
};
