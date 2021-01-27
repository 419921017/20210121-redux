"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-21 21:11:34
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-21 21:18:18
 */
function isPlainObject(obj) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return false;
  }

  var proto = obj; // 这里会无限找下去, 知道找到Object.__proto__

  while (Object.getPrototypeOf(proto)) {
    proto = Object.getPrototypeOf(proto);
  } // 判断是不是由Object构造函数创建的


  return Object.getPrototypeOf(obj) === proto;
}

var _default = isPlainObject;
exports["default"] = _default;