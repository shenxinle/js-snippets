/**
 * 暂时考虑了对象、数组和基本数据类型
 * 以及循环应用
 *
 * 更过的数据类型支持待补充
 */
const deepCopy = (() => {
  const isObject = (obj) => (Object.prototype.toString.call(obj) === '[object Object]');
  let map = new Map();
  return (obj, isRecursive = 'false') => {
    let result;

    if (map.has(obj)) return result = map.get(obj);

    if (Array.isArray(obj)) {
      result = [];
      map.set(obj, result);
      for(let i = 0; i < obj.length; i++) {
        result.push(deepCopy(obj[i], 'yes'));
      }
    } else if (isObject(obj)) {
      result = {};
      map.set(obj, result);
      for (let key in obj) {
        result[key] = deepCopy(obj[key], 'yes');
      }
    } else {
      result = obj;
    }

    if (isRecursive === 'false') map.clear();
    return result;
  }
})()


var obj = {
  a: [
    {
      b: 'fd',
    },
    2
  ],
  h: [1, 2],
  k: 12
};
obj.a[0].c = obj;
obj.a[0].d = obj.h;

console.log(obj);
console.log(deepCopy(obj));
console.log(deepCopy(obj));
