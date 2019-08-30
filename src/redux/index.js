/**
 * createStore
 * combineReducers
 * bindActionCreators
 * applyMiddleware
 * compose
 */
import {
  isFunction,
  isPlainObject
} from './util';


/**
 * @param {func} reducer
 * @param {any} preloadedState
 * @param {func} enhancer
 * @returns {object} store {
 *    getState,
 *    dispatch,
 *    subscribe,
 *    replaceReducer
 * }
 */
export function createStore(reducer, preloadedState, enhancer) {
  if (!isFunction(reducer)) {
    throw new TypeError('expect reducer to be a function');
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];

  const getState = () => {
    return currentState;
  };

  const dispatch = (action) => {
    if (!isPlainObject(action) || !action.type) {
      throw new Error('expect action to be an object with type attr');
    }
    currentState = currentReducer(currentState, action);
    currentListeners.forEach(listener => {
      listener();
    });
  };

  const subscribe = (listener) => {
    if (!isFunction(listener)) {
      throw new TypeError('expect listener to be a function');
    }
    currentListeners.push(listener);
    const unsubscribe = () => {
      currentListeners = currentListeners.filter(fn => fn !== listener);
    };
    return unsubscribe;
  };

  return {
    getState,
    dispatch,
    subscribe
  };
}

/**
 * @param {object} reducers
 */
export function bindReducers(reducers) {
  let keys = Object.keys(reducers);
  return (state, action) => {
    let nextState = {};
    let changed = false;
    keys.forEach(key => {
      let reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      changed = changed || (nextState[key] !== state[key]);
    });
    return changed ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => {
    dispatch(actionCreator(...args));
  }
}

/**
 * @param {object | func} actionCreators
 * @param {func} dispatch
 */
export function bindActionCreators(actionCreators, dispatch) {
  if (isFunction(actionCreators)) {
    return bindActionCreator(actionCreators, dispatch);
  } else {
    let result = {};
    Object.keys(actionCreators).forEach(key => {
      result[key] = bindActionCreator(actionCreators[key], dispatch);
    });
    return result;
  }
}

/**
 * @param  {...func} funcs
 * from right to left
 * compose(f, g, h) ==  (...args) => f(g(h(...args)))
 */
export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  } else if (funcs.length === 1) {
    return funcs[0];
  } else {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
  }
}
