import React, { Component, Placeholder, lazy } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

//import ProductDetails from "../components/ProductDetails";
import TransitionWrapper from "../components/TransitionWrapper";

const ProductDetails = lazy(() => import("../components/ProductDetails"));

const Wrapper = styled(TransitionWrapper)`
  transform: translateX(-100%);
  perspective: 1000;
  backface-visibility: hidden;

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

  span {
    transform: rotate(90deg) translateY(-18px);

    &:before {
      content: "×";
      font-size: 30px;
      line-height: 0px;
      font-weight: 100;
      margin-right: 10px;
      position: relative;
      top: 6px;
    }
  }
  opacity: 0;

  transition: opacity 0.3s ease-out;
  backface-visibility: hidden;
  perspective: 1000px;

  .router.product-route & {
    opacity: 1;
    transition-delay: var(--slide-duration);
    transition-timing-function: ease-out;
  }
`;

export default class Product extends Component {
  state = { slug: null };

  static getDerivedStateFromProps(props) {
    if (!props.match) {
      return null;
    }

    return { slug: props.match.slug };
  }

  render() {
    const { slug } = this.state;

    return (
      <Wrapper>
        <BackLink>
          <span>Back to home</span>
        </BackLink>
        <div className="product-background">
          {slug && (
            <Placeholder key={slug} delayMs={300} fallback={"fancy spinner"}>
              <ProductDetails key={slug} slug={slug} />
            </Placeholder>
          )}
        </div>
      </Wrapper>
    );
  }
}
