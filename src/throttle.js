/**
 * @param {function} fn
 * @param {int} wait
 */
export const throttle = (fn, wait) => {
  let prev = 0;
  return (...args) => {
    let now = Date.now();
    if (now - prev >= wait) {
      prev = now;
      fn.apply(this, args);
    }
  };
};

export const debounce = (fn, wait) => {
  let timeout = null;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(this, args);
    }, wait);
  };
};
