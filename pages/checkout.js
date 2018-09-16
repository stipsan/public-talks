import React, { Component } from "react";

export default class Checkout extends Component {
  static defaultProps = { test: "bar" };

  state = { test: this.props.test };

  render() {
    return (
      <span>
        Checkout {this.props.test} {this.state.test}{" "}
      </span>
    );
  }
}
