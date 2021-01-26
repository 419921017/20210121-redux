/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: power_840
 * @Date: 2021-01-26 21:12:58
 * @LastEditors: power_840
 * @LastEditTime: 2021-01-26 21:25:14
 */

import { Component } from "react";
import bindActionCreators from "../redux/bindActionCreator";
import ReactContext from "./context";

function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrapperComponent) {
    return class extends Component {
      static contextType = ReactContext;
      constructor(props, context) {
        super(props);
        this.state = mapStateToProps(context.store.getState());
      }
      componentDidMount() {
        this.unsubcribe = this.context.store.substribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      componentWillUnmount() {
        this.unsubcribe();
      }
      render() {
        const actions = bindActionCreators(
          mapDispatchToProps(mapDispatchToProps, this.context.store.dispatch)
        );
        return <WrapperComponent {...this.state} {...actions} />;
      }
    };
  };
}

export default connect;
