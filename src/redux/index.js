/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-21 21:11:14
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 20:23:43
 */

import isPlainObject from "./utils/isPlainObject";
import ActionTypes from "./ActionTypes";
import combineReducers from "./combineReducers";
import bindActionCreators from "./bindActionCreator";

function createStore(reducer, perloadState) {
  let currentReducer = reducer;
  let currentState = perloadState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("action必须是一个纯对象");
    }
    if (action.type === undefined) {
      throw new Error("action的type不能是undefined");
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
   * @return {*} unSubstribe 解除订阅
   */
  function substribe(fn) {
    let isSubstrible = true;
    currentListeners.push(fn);
    return function unSubstribe() {
      if (!isSubstrible) {
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
    substribe,
  };
}

const result = {
  bindActionCreators,
  createStore,
  combineReducers,
};

export default result;
