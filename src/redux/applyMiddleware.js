/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 19:58:57
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 20:45:20
 */

import compose from './compose';

function applyMiddleware(...middleWares) {
  return (createStore) =>
    (...args) => {
      let store = createStore(...args);
      let dispatch = () => {
        throw Error('现在还没有dispatch');
      };

      // applyMiddleware 将会对 dispatch 函数进行改写，使得 dispatch 在触发 reducer 之前，会首先执行对 Redux 中间件的链式调用。
      let middleWareAPI = {
        getState: store.getState,
        // @ts-ignore
        dispatch: (...args) => dispatch(...args),
      };
      // 遍历中间件数组，调用每个中间件，并且传入 middlewareAPI 作为入参，得到目标函数数组 chain
      const chain = middleWares.map((middleware) => middleware(middleWareAPI));

      // 改写原有的 dispatch：将 chain 中的函数按照顺序“组合”起来，调用最终组合出来的函数，传入 dispatch 作为入参
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
}

export default applyMiddleware;
