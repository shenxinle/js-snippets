import { EventEmitter } from './eventemitter';

describe('eventemitter', () => {
  test('emitter', () => {
    const emitter = new EventEmitter();
    let result = [];
    let name1 = 'name1';
    let fn1 = (...args) => {
      result.push(`fn1-${args.join(',')}`);
    };
    let fn2 = (...args) => {
      result.push(`fn2-${args.join(',')}`);
    };
    let fn3 = (...args) => {
      result.push(`fn3-${args.join(',')}`);
    };

    emitter.on(name1, fn1);
    emitter.once(name1, fn2);
    emitter.on(name1, fn3);

    emitter.emit(name1, 1, 2, 3);
    expect(result).toEqual([
      'fn1-1,2,3',
      'fn2-1,2,3',
      'fn3-1,2,3',
    ]);

    result = [];
    emitter.off(name1, fn1);
    emitter.emit(name1, 'a', 'b');
    expect(result).toEqual([
      'fn3-a,b',
    ]);

    result = [];
    emitter.off(name1);
    emitter.emit(name1, 'a', 'b');
    expect(result).toEqual([]);
  });
});
