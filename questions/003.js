function formatRange(numStr) {
  let nums = numStr.split(/\s*,\s*/).map(v => Number(v));
  let results = [];
  let begin, end;
  const format = (begin, end) => {
    if (begin === end) {
      return String(begin);
    } else {
      return `${begin}~${end}`;
    }
  };

  for(let i = 0; i < nums.length; i++) {
    let val = nums[i];
    if (begin === void 0) {
      begin = end = val;
    } else {
      if (val === end + 1) {
        end = val;
      } else {
        results.push(format(begin, end));
        begin = end = val;
      }
    }

    if (i === nums.length - 1) {
      results.push(format(begin, end));
    }
  }

  return results.join(', ');
}

console.log(formatRange('1, 2, 3, 5, 7, 8, 10'));
