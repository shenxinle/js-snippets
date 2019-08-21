import { throttle, debounce } from './throttle'

describe('throttle', () => {
  test('throttle-count', (done) => {
    let i = 0;
    let fn = () => {
      i++;
    };
    let fn1 = throttle(fn, 500);
    let count = 0;
    let interval = setInterval(() => {
      count++;
      fn1();

      // 100, 600, 1100, 1600
      if (count === 1) {
        expect(i).toBe(1);
      }
      if (count === 8) {
        expect(i).toBe(2);
      }
      if (count === 20) {
        clearInterval(interval);
        expect(i).toBe(4);
        done();
      }
    }, 100);
  });

  test('throttle-args', (done) => {
    let result = [];
    let fn = (...args) => {
      result = result.concat(args);
    };
    let fn1 = throttle(fn, 500);
    let count = 0;
    let interval = setInterval(() => {
      count++;
      fn1(count, count * count);

      // 100, 600, 1100
      if (count === 15) {
        clearInterval(interval);
        expect(result).toEqual([1, 1, 6, 36, 11, 121]);
        done();
      }
    }, 100);
  });
});

describe('debounce', () => {
  test('debounce', (done) => {
    let result = [];
    let fn = (...args) => {
      result = result.concat(args);
    };
    let fn1 = debounce(fn, 300);
    let count = 0;
    let interval = setInterval(() => {
      count++;
      fn1(count, count * count);

      if (count === 4) {
        clearInterval(interval);
        expect(result).toEqual([]);
        setTimeout(() => {
          expect(result).toEqual([4, 16]);

          count++;
          fn1(count, count * count);

          expect(result).toEqual([4, 16]);
          setTimeout(() => {
            expect(result).toEqual([4, 16, 5, 25]);
            done();
          }, 400);
        }, 400);
      }
    }, 100);
  });
});
