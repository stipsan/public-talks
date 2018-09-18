// detail page
import React, { Component } from "react";
import { Link } from "@reach/router";

export default class Product extends Component {
  render() {
    return (
      <>
        <div className="product-background">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/selection">Checkout</Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
