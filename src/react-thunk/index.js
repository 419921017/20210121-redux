/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 20:46:41
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 21:32:30
 */
function createThunkMiddleware() {
  return ({ getState, dispatch }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(getState, dispatch);
    } else {
      return next(action);
    }
  };
}

const thunk = createThunkMiddleware();

export default thunk;
