/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-27 20:16:44
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-27 20:44:40
 */
const logger = ({ getState }) => (next) => (action) => {
  console.log("old state", getState());
  next(action);
  console.log("new state", getState());
};

export default logger;
