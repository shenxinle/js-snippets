/**
 * PENDING => FULFILLED / REJECTED
 * MyPromise接收一个函数executor，executor有两个参数resolve方法和reject方法
 * resolve将PENDING改变为FULFILLED
 * reject将PENDING改变为FULFILLED
 * promise变为FULFILLED状态后具有一个唯一的value
 * promise变为REJECTED状态后具有一个唯一的reason
 *
 * then方法接受两个参数onFulfilled、onRejected，它们分别在状态由PENDING改变为FULFILLED、REJECTED后调用
 * then方法链式调用 - 即then方法中要返回一个新的promise，并将then方法的返回值进行resolve
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const noop = () => {};
const toAsync = (fn) => (...args) => {
  setTimeout(() => {
    fn(...args);
  });
};

export function MyPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fn => fn());
    }
  };
  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn());
    }
  };

  if (typeof executor === 'function') {
    executor(resolve, reject);
  } else {
    throw new TypeError('expect executor to be a function');
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = onFulfilled || (val => val);
  onRejected = onRejected || (reason => { throw reason });
  let p = new MyPromise((resolve, reject) => {
    switch(this.state) {
      case FULFILLED:
        toAsync(() => {
          try {
            let value = onFulfilled(this.value);
            resolve(value);
          } catch(reason) {
            reject(reason);
          }
        })();
        break;
      case REJECTED:
        toAsync(() => {
          try {
            let value = onRejected(this.reason);
            resolve(value);
          } catch(reason) {
            reject(reason);
          }
        })();
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(toAsync(() => {
          try {
            let value = onFulfilled(this.value);
            resolve(value);
          } catch(reason) {
            reject(reason);
          }
        }));
        this.onRejectedCallbacks.push(toAsync(() => {
          try {
            let value = onRejected(this.reason);
            resolve(value);
          } catch(reason) {
            reject(reason);
          }
        }));
        break;
    }
  });
  return p;
};

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

MyPromise.prototype.finally = function(fn = noop) {
  return this.then((value) => {
    fn();
    return value;
  }, (reason) => {
    fn();
    throw reason;
  });
};

MyPromise.resolve = function(value) {
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.all = function(promises) {
  if (!Array.isArray(promises)) throw new TypeError('expect promises to be an array');

  return new MyPromise((resolve, reject) => {
    if (!promises.length) {
      resolve([]);
    } else {
      let result = [];
      let resolvedCount = 0;
      promises.forEach((p, i) => {
        p.then((value) => {
          result[i] = value;
          resolvedCount ++;

          if (resolvedCount === promises.length) {
            resolve(result);
          }
        }, (reason) => {
          reject(reason);
        });
      });
    }
  });
};

MyPromise.race = function(promises) {
  if (!Array.isArray(promises)) throw new TypeError('expect promises to be an array');

  return new MyPromise((resolve, reject) => {
    if (!promises.length) {
      resolve();
    } else {
      promises.forEach((p, i) => {
        p.then((value) => {
          resolve(value);
        }, (reason) => {
          reject(reason);
        });
      });
    }
  });
};
