/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 20:46:41
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 21:53:09
 */
function createThunkMiddleware(extraArgument) {
  return ({ getState, dispatch }) =>
    (next) =>
    (action) => {
      if (typeof action === 'function') {
        // 函数执行完成后不会继续往下执行, 直接return出来
        // 这个里面dispatch是经过包装后的dispatch, 不是原生的store.dispatch
        // return出来后会重新执行dispatch, 这里的dispatch是传入执行函数中的包装后的dispatch
        return action(dispatch, getState, extraArgument);
      } else {
        return next(action);
      }
    };
}

const thunk = createThunkMiddleware();

// @ts-ignore
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
