function random(arrs, num) {
  var results = [];
  for (let i = 0; i < num; i++) {
    let randomKey = Math.floor(Math.random() * (arrs.length - i));
    results.push(arrs[randomKey]);
    arrs[randomKey] = arrs[arrs.length - 1 - i];
  }
  return results;
}

// 结合统计学上的随机采样点
// 比如 1000k 里取 10K, 可以 1000 里取 10, 再累加 1000。

var arrs = [];
var num = 100;
for (let i = 0; i < 200; i++) {
  arrs[i] = i + 1;
}

console.log(JSON.stringify(random(arrs, num)));
