/**
 * 有 1、5、11 三种面额的不限量钞票，用最少的数量凑出 15
 */
function dp1(n) {
  if (n === 0) return 0;

  let fn = Infinity;
  if (n - 1 >= 0) fn = Math.min(fn, dp1(n - 1) + 1);
  if (n - 5 >= 0) fn = Math.min(fn, dp1(n - 5) + 1);
  if (n - 11 >= 0) fn = Math.min(fn, dp1(n - 11) + 1);
  return fn;
}

// 同时输出方案
function dp2(n, res = {
  count: 0,
  1: 0,
  5: 0,
  11: 0
}) {
  if (n === 0) return res;

  let tempRes;
  if (n - 1 >= 0) {
    tempRes = {
      ...dp2(n - 1, res)
    };
    tempRes.count++;
    tempRes['1']++;
  }
  if (n - 5 >= 0) {
    let thisRes = {
      ...dp2(n - 5, res)
    };
    thisRes.count++;
    thisRes['5']++;
    if (thisRes.count < tempRes.count) {
      tempRes = thisRes;
    }
  }
  if (n - 11 >= 0) {
    let thisRes = {
      ...dp2(n - 11, res)
    };
    thisRes.count++;
    thisRes['11']++;
    if (thisRes.count < tempRes.count) {
      tempRes = thisRes;
    }
  }

  return tempRes;
}

for (let i = 10; i <= 15; i++) {
  console.log(`${i}: ${dp1(i)}`);
  console.log(`${i}: ${JSON.stringify(dp2(i))}`);
}
