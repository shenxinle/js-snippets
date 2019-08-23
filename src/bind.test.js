import "./bind";

describe('bind', () => {
  test('call', () => {
    const obj = {
      a: 2
    };
    const fn = function(a, b) {
      return this.a + a + b;
    };

    expect(fn.call2(obj, 3, 4)).toBe(9);
  });

  test('apply', () => {
    const obj = {
      a: 2
    };
    const fn = function(a, b) {
      return this.a + a + b;
    };

    expect(fn.apply2(obj, [3, 4])).toBe(9);
  });

  test('bind', () => {
    const obj = {
      a: 2
    };
    const fn = function(a, b) {
      return this.a + a + b;
    };

    expect(fn.bind2(obj, 3)(4)).toBe(9);
  });
});
