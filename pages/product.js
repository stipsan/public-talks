// detail page
import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

import ProductDetails from "../components/ProductDetails";

const BackLink = styled(Link).attrs({ className: "back", to: "/" })`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: calc(100vw - 1400px);
  min-width: 200px;
  z-index: 1;
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: opacity 0.3s ease-in;

  span {
    transform: rotate(90deg) translateY(-18px);

    &:before {
      content: "×";
      font-size: 30px;
      line-height: 0px;
      font-weight: 100;
      margin-right: 10px;
      position: relative;
      top: 4px;
    }
  }

  .router-exit &,
  .router-enter & {
    opacity: 0;
  }
  .router-enter & {
    transition: none;
  }
  .router-exit & {
    transition: opacity 0.1s ease-out;
  }
`;

export default class Product extends Component {
  render() {
    const { slug } = this.props;

    return (
      <>
        <BackLink>
          <span>Back to home</span>
        </BackLink>
        <div className="product-background">
          <ProductDetails slug={slug} />
        </div>
      </>
    );
  }
}
