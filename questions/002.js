function transform(entry) {
  var output = {};
  const traverse = (obj, attrPaths) => {
    Object.keys(obj).map(key => {
      let thisAttrPaths = attrPaths.slice();
      thisAttrPaths.push(key);
      if (isPlainObject(obj[key])) {
        traverse(obj[key], thisAttrPaths);
      } else {
        output[thisAttrPaths.join('.')] = obj[key];
      }
    });
  }

  traverse(entry, []);

  return output;
}

const isPlainObject = (input) => {
  return Object.prototype.toString.call(input) === '[object Object]';
}

// test
console.log(
  JSON.stringify(
    transform({
      a: {
        b: {
          c: {
            dd: 'abcdd'
          }
        },
        d: {
          xx: 'adxx'
        },
        e: 'ae'
      }
    })
  )
);
