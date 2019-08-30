// 输入 n, 计算 1~n 间出现的 1 的个数
// 暴力遍历
function countOne1(n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += String(i).split('').filter(c => c === '1').length;
  }
  return count;
}

// 规律计算
function countOne2(n) {
  let count = 0;
  let factor = 1;
  let next = Math.floor(n / factor);

  while(next) {
    let lower = n - next * factor;
    let cur = next % 10;
    let high = Math.floor(n / (10 * factor));

    if (cur === 0) {
      count += high * factor;
    } else if (cur === 1) {
      count += high * factor + lower + 1;
    } else {
      count += (high + 1) * factor;
    }

    factor *= 10;
    next = Math.floor(next / 10);
  }

  return count;
}

/* 测试 */
// let time = Date.now();
// console.log(countOne1(401010));
// console.log(`time: ${Date.now() - time}`);

// time = Date.now();
// console.log(countOne2(401010));
// console.log(`time: ${Date.now() - time}`);



// 输入字符串，找出连续出现次数最多的字符及个数
// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}
function findMaxChar(str) {
  if (!str.length) {
    return null;
  }

  let maxChars = [str[0]];
  let maxCount = 1;
  let currentChar = str[0];
  let currentCount = 1;

  for(let i = 1; i < str.length; i++) {
    let char = str[i];
    if (char === currentChar) {
      currentCount++;

      if (currentCount > maxCount) {
        maxChars = [currentChar];
        maxCount = currentCount;
      } else if (currentCount === maxCount) {
        maxChars.push(currentChar);
      }
    } else {
      currentChar = char;
      currentCount = 1;
    }
  }

  let result = {};
  maxChars.forEach(char => {
    result[char] = maxCount;
  });
  return result;
}

// console.log(findMaxChar('abcaakjbb'));
// console.log(findMaxChar('abbkejsbcccwqaa'));



// 数组去重
// 如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]
// 如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]
// 如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

// stringify, obj 的 key 顺序不同时有问题
function filterRepeated(arr) {
  let result = [];
  let tempObj = {};
  arr.forEach(item => {
    let itemStr = JSON.stringify(item);
    if (!tempObj[itemStr]) {
      result.push(item);
      tempObj[itemStr] = true;
    }
  });
  return result;
}

function filterRepeated2(arr) {
  let result = [];
  arr.forEach(item => {
    let has = result.some(rItem => {
      return isEqual(item, rItem);
    });
    if (!has) {
      result.push(item);
    }
  });
  return result;
}
function isEqual(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }
  const isPlainObject = (input) => {
    return Object.prototype.toString.call(input) === '[object Object]';
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    let aKeys = Object.keys(a);
    let bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i++) {
      if (!isEqual(a[aKeys[i]], b[aKeys[i]])) return false;
    }
    return true;
  }
  return a === b;
}

// console.log(filterRepeated([123, "meili", "123", "mogu", 123]));
// console.log(filterRepeated([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]));
// console.log(filterRepeated([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]));
// console.log(filterRepeated2([123, "meili", "123", "mogu", 123]));
// console.log(filterRepeated2([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]));
// console.log(filterRepeated2([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]));


