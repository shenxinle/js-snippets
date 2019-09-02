function transform(entry) {
  var output = {};
  Object.keys(entry).forEach(key => {
    let attrs = key.split('.');
    let obj = output;
    attrs.forEach((attr, index, attrs) => {
      if (index < attrs.length - 1) {
        obj[attr] = obj.hasOwnProperty(attr) ? obj[attr] : {};
        obj = obj[attr];
      } else {
        obj[attr] = entry[key];
      }
    });
  });
  return output;
}

// test
console.log(
  JSON.stringify(
    transform({
      'a.b.c.dd': 'abcdd',
      'a.d.xx': 'adxx',
      'a.e': 'ae'
    })
  )
);
