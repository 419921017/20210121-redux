/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 21:59:56
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 22:11:39
 */

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

function promiseMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    return isPromise(action.payload)
      ? action.payload
          .then((result) => {
            dispatch({
              ...action,
              payload: result,
            });
          })
          .catch((error) => {
            dispatch({
              ...action,
              payload: error,
              error: true,
            });
            return Promise.reject(error);
          })
      : next(action);
  };
}

export default promiseMiddleware;
