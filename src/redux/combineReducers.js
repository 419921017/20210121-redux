/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-26 20:13:47
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-26 20:17:00
 */
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function (state = {}, actions) {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i];
      const reducer = reducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, actions);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

export default combineReducers;
