export const getIdFromUrl = (char) => {
  if (!char) {
    return null;
  }

  const arr = char.split("/");
  const id = arr[arr.length - 2];
  return id;
};
