import React, { Component } from "react";
import { Link } from "@reach/router";

export default class Checkout extends Component {
  static defaultProps = { test: "bar" };

  state = { test: this.props.test };

  render() {
    return (<>
      <span>
        Checkout {this.props.test} {this.state.test}{" "}
      </span>
      <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
     
    </ul>
      </>
    );
  }
}
