/**
 * 模拟实现 call, apply, bind
 */

Function.prototype.call2 = function (ctx, ...args) {
  if (this === Function.prototype) { // 防止直接调用
    return void 0;
  }
  ctx = ctx || (typeof window !== 'undefined' ? window : global);
  const fn = Symbol();
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

Function.prototype.apply2 = function (ctx, args) {
  if (this === Function.prototype) { // 防止直接调用
    return void 0;
  }
  ctx = ctx || (typeof window !== 'undefined' ? window : global);
  const fn = Symbol();
  ctx[fn] = this;
  const result = Array.isArray(args) ? ctx[fn](...args) : ctx[fn]();
  delete ctx[fn];
  return result;
};

Function.prototype.bind2 = function (ctx, ...args) {
  const fn = this;
  return (...moreArgs) => {
    return fn.apply(ctx, [...args, ...moreArgs])
  }
};
