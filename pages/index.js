// list over stuff
import React, { Component } from "react";
import { Link } from "@reach/router";

export default class Index extends Component {
  render() {
    return (
      <>
      <div className="hero">
        <svg className="logo">
          <desc>The logo</desc>
        </svg>
        <div className="copy">
          <h5>Wireless Speaker System</h5>
          <h1>
            Select your Bang &amp; Olufsen speakers for the perfect audio
            experience
          </h1>
        </div>
      </div>
      <ul>
      <li>
        <Link to="selection">Checkout</Link>
      </li>
      <li>
        <Link to="product/fancy-product">Fancy product</Link>
      </li>
    </ul>
      </>
    );
  }
}
