export const removeElement = (arr, target) => {
  if (!arr.length) {
    return arr;
  }

  const copyArr = [...arr];
  const index = copyArr.indexOf(target);

  if (index !== -1) {
    return copyArr.slice(0, index).concat(copyArr.slice(index + 1));
  }

  return arr;
};
