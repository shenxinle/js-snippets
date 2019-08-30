export const isFunction = (input) => {
  return typeof input === 'function';
};

export const isPlainObject = (input) => {
  return Object.prototype.toString.call(input) === '[object Object]';
};
