export class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, fn) {
    let fns = this.listeners[name] || (this.listeners[name] = []);
    fns.push(fn);
  }

  once(name, fn) {
    let wrapFn = (...args) => {
      fn.apply(null, args);
      this.off(name, wrapFn);
    };
    this.on(name, wrapFn);
  }

  off(name, fn) {
    let fns = this.listeners[name] || (this.listeners[name] = []);

    if (fn) {
      this.listeners[name] = fns.filter(thisFn => thisFn !== fn);
    } else {
      this.listeners[name] = null;
    }
  }

  emit(name, ...args) {
    let fns = this.listeners[name] || (this.listeners[name] = []);
    fns.forEach(fn => {
      fn.apply(null, args);
    });
  }
}
