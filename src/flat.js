export const flat = (arr) => {
  let result = [];
  if (Array.isArray(arr)) {
    arr.forEach(item => {
      result = result.concat(flat(item));
    });
  } else {
    result = result.concat(arr);
  }
  return result;
}
