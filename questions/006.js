function reverse(num) {
  return String(num).split('').reverse().join('');
}

function reverse2(num) {
  if (num < 10) {
    return String(num);
  } else {
    return String(num % 10) + reverse2(Math.floor(num / 10));
  }
}

function reverse3(num) {
  let result = '';
  while(num) {
    result += String(num % 10);
    num = Math.floor(num / 10);
  }
  return result;
}

console.log(reverse(1234567));
console.log(reverse2(1234567));
console.log(reverse3(1234567));
