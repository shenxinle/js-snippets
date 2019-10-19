// 累加器
function makeAccumulator(value) {
  return (val) => {
    value += val;
    return value;
  }
}

// let acc1 = makeAccumulator(5);
// console.log(acc1(4));
// console.log(acc1(2));



// 计数器
function makeMonitored(fn) {
  let count = 0;
  return (...args) => {
    if (args[0] === 'how-many-calls') {
      return count;
    } else if (args[0] === 'reset-count') {
      count = 0;
      return count;
    } else {
      count++;
      return fn(...args);
    }
  }
}

// let fn = (...args) => (args.reduce((sum, val) => (sum + val), 0));
// let mFn = makeMonitored(fn);
// console.log(mFn(10, 2));
// console.log(mFn(30));
// console.log(mFn('how-many-calls'));
// console.log(mFn('reset-count'));
// console.log(mFn(1, 20));
// console.log(mFn('how-many-calls'));



// 递归与迭代
function factorial(n) {
  if (n > 1) {
    return n * factorial(n - 1);
  } else {
    return 1;
  }
}
function factorial2(n) {
  return factIter(1, 1, n);
}
function factIter(result, cur, max) {
  if (cur > max) {
    return result;
  } else {
    return factIter(result * cur, cur + 1, max);
  }
}

// console.log(factorial(6));
// console.log(factorial2(6));
