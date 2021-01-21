/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-21 21:11:34
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-21 21:18:18
 */


 function isPlainObject(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return false
  }
  let proto = obj
  // 这里会无限找下去, 知道找到Object.__proto__
  while (Object.getPrototypeOf(proto)) {
    proto = Object.getPrototypeOf(proto)
  }
  // 判断是不是由Object构造函数创建的
  return Object.getPrototypeOf(obj) === proto
 }

 export default isPlainObject