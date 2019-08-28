export class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, fn) {
    const fns = this.listeners[name] || (this.listeners[name] = []);
    fns.push(fn);
  }

  once(name, fn) {
    const wrapFn = (...args) => {
      fn.apply(null, args);
      this.off(name, wrapFn);
    };
    this.on(name, wrapFn);
  }

  off(name, fn) {
    const fns = this.listeners[name] || (this.listeners[name] = []);

    if (fn) {
      this.listeners[name] = fns.filter((thisFn) => thisFn !== fn);
    } else {
      this.listeners[name] = null;
    }
  }

  emit(name, ...args) {
    const fns = this.listeners[name] || (this.listeners[name] = []);
    fns.forEach((fn) => {
      fn.apply(null, args);
    });
  }
}
