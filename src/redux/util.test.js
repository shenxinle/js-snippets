import {
  isFunction,
  isPlainObject
} from './util';

describe('redux.util', () => {
  test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(void 0)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
  });

  test('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(void 0)).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject('a')).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
  });
});
