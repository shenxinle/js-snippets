import { MyPromise } from './promise';

describe('promise', () => {
  test('promise-resolve', (done) => {
    let p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(123);
      })
    });

    p.then((value) => {
      expect(value).toBe(123);
      done();
    });
  });

  test('promise-reject', (done) => {
    let p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject('hehe');
      })
    });

    p.then(() => {}, (reason) => {
      expect(reason).toBe('hehe');
      done();
    });
  });

  test('promise-async', (done) => {
    let p = new MyPromise((resolve, reject) => {
      resolve(123)
    });
    let result = [];

    p.then((value) => {
      result.push(value);
      expect(result).toEqual([456, 123]);
      done();
    });
    result.push(456);
  });

  test('promise-chain', (done) => {
    let p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      })
    });
    let result = [];

    p.then((value) => {
      result.push(value);
      throw 'hehe';
    }).then(() => {}, (reason) => {
      result.push(reason);
      return 2;
    }).then((value) => {
      result.push(value);
      throw 'niu';
    }).then(() => {}, (reason) => {
      result.push(reason);
      return 3;
    }).then((value) => {
      result.push(value);

      expect(result).toEqual([1, 'hehe', 2, 'niu', 3]);
      done();
    });
  });

  test('promise-all', (done) => {
    MyPromise.all([
      MyPromise.resolve(1),
      MyPromise.resolve(2).then(() => {return 3})
    ]).then(result => {
      expect(result).toEqual([1, 3]);
      done();
    });
  });

  test('promise-all-reject', (done) => {
    MyPromise.all([
      MyPromise.resolve(1),
      MyPromise.reject(2)
    ]).catch(reason => {
      expect(reason).toBe(2);
      done();
    });
  });
});
