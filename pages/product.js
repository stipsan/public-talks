import React, { Component, Placeholder } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

import ProductDetails from "../components/ProductDetails";

const TransitionWrapper = styled.div.attrs({ className: "route" })`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform var(--slide-duration);
`;

const Wrapper = styled(TransitionWrapper)`
  transform: translateX(-100%);

  .router.product-route & {
    transform: translateX(0%);
  }
`;

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
  state = { slug: this.props.slug };

  static getDerivedStateFromProps(props) {
    if (!props.slug) {
      return null;
    }

    return { slug: props.slug };
  }

  componentDidUpdate() {}
  render() {
    const { slug } = this.state;

    return (
      <Wrapper>
        <BackLink>
          <span>Back to home</span>
        </BackLink>
        <div className="product-background">
          <Placeholder key={slug} delayMs={300} fallback={"fancy spinner"}>
            <ProductDetails key={slug} slug={slug} />
          </Placeholder>
        </div>
      </Wrapper>
    );
  }
}
