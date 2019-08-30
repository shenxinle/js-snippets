import {
  createStore,
  compose
} from './index';

describe('redux', () => {
  test('createStore', () => {
    const reducer = (state, action) => {
      state = state || {
        count: 0
      };
      switch (action.type) {
        case 'ADD':
          state = Object.assign({}, state, {
            count: state.count + (action.value || 0)
          });
          break;
        case 'DECREMENT':
          state = Object.assign({}, state, {
            count: state.count - (action.value || 0)
          });
          break;
        default:
          break;
      }

      return state;
    };
    const store = createStore(reducer, {
      count: 5
    });
    let num = 0;
    const listener = () => {
      num++;
    };
    const unlistener = store.subscribe(listener);

    expect(store.getState().count).toBe(5);
    store.dispatch({
      type: 'ADD',
      value: 5
    });
    unlistener();
    store.dispatch({
      type: 'DECREMENT',
      value: 2
    });
    expect(store.getState().count).toBe(8);
    expect(num).toBe(1);
  });

  test('compose', () => {
    let result = [];
    const a = (v) => {result.push('a'); return 2*v;};
    const b = (v) => {result.push('b'); return 2*v;};
    const c = (v) => {result.push('c'); return 2*v;};
    const d = (v) => {result.push('d'); return 2*v;};

    const func = compose(a, b, c, d);
    result.push(func(1));
    expect(result).toEqual(['d', 'c', 'b', 'a', 16]);
  });
});
