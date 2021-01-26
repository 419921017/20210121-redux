/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-26 20:55:06
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-26 21:17:45
 */

import { Component } from "react";
import ReactContext from "./context";

class Provider extends Component {
  constructor() {}
  render() {
    return (
      <ReactContext.Provider value={{ store: this.props.store }}>
        {this.props.children}
      </ReactContext.Provider>
    );
  }
}

export default Provider;
