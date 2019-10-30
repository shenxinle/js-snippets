const compose = (middlewares) => {
  const noop = () => {};

  return (ctx) => {
    const fn = (i) => {
      let thisFn = middlewares[i] || noop;

      try {
        return Promise.resolve(
          thisFn(ctx, fn.bind(null, i + 1))
        )
      } catch(err) {
        return Promise.reject(err);
      }
    }
    return fn(0);
  }
}

let middlewares = [
  async (ctx, next) => {
    console.log(1);
    await next();
    console.log(5);
  },
  async (ctx, next) => {
    console.log(2);
    await next();
    console.log(4);
  },
  async (ctx, next) => {
    console.log(3);
  }
];
let fn = compose(middlewares);
console.log(fn({}));
