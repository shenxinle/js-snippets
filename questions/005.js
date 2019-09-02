function getParams(url, key) {
  let match = url.match(new RegExp(`(?:\\?|&)${key}=(.*?)(?:&|$)`), 'i');
  if (match) {
    return match[1].split(',');
  } else {
    return [];
  }
}

console.log(
  getParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33', 'elective')
);
console.log(
  getParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33', 'elective')
);
console.log(
  getParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33', 'elective')
);
