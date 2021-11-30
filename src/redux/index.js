/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-21 21:11:14
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 20:23:43
 */

import isPlainObject from './utils/isPlainObject';
import ActionTypes from './ActionTypes';
import combineReducers from './combineReducers';
import bindActionCreators from './bindActionCreator';

function createStore(reducer, preloadedState, enhancer) {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];

  // 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    // 此时第二个参数会被认为是 enhancer（中间件）
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('action必须是一个纯对象');
    }
    if (action.type === undefined) {
      throw new Error('action的type不能是undefined');
    }
    currentState = currentReducer(currentState, action);
    currentListeners.forEach((fn) => {
      fn();
    });
    return action;
  }

  /**
   * 订阅发布
   *
   * @param {*} fn
   * @return {*} unSubscribe 解除订阅
   */
  function subscribe(fn) {
    let isSubscribe = true;
    currentListeners.push(fn);

    return function unSubscribe() {
      if (!isSubscribe) {
        return;
      }
      const index = currentListeners.indexOf(fn);
      index !== -1 && currentListeners.splice(index, 1);
    };
  }
  // redux初始化会执行一次reducer, 指向default
  dispatch(ActionTypes.INIT);

  return {
    getState,
    dispatch,
    subscribe,
  };
}

const result = {
  bindActionCreators,
  createStore,
  combineReducers,
};

export default result;
