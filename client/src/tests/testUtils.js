export const findElement = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
