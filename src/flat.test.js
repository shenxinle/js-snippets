import { flat } from './flat';

describe('flat', () => {
  test('flat', () => {
    const mocks = [
      [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
    ];
    const results = [
      [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
    ];
    expect(flat(mocks[0])).toEqual(results[0]);
  });
});
