/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 19:58:57
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 20:10:18
 */

import compose from "./compose";

function applyMiddleware(...middlewares) {
  return (createStore) => {
    return (reducer) => {
      let store = createStore(reducer);
      let dispatch = () => {
        throw Error("现在还没有dispatch");
      };

      let middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));

      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}

export default applyMiddleware;
