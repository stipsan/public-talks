import React, { Component, unstable_Suspense as Suspense, lazy } from "react";
import styled from "styled-components";

import TransitionWrapper from "../components/TransitionWrapper";
import ErrorBoundary from "../components/ErrorBoundary";
import { WidePlaceholder } from "../components/Placeholders";
import BackLink from "../components/BackLink";
import { cache, ProductResource } from "../api";

const ProductDetails = lazy(() => import("../components/ProductDetails"));

const Wrapper = styled(TransitionWrapper)`
  transform: translateX(-100%);
  perspective: 1000;
  backface-visibility: hidden;

  .router.product-route & {
    transform: translateX(0%);
  }
`;

const ProductBackground = styled.div`
  color: #4a4a4a;
  position: relative;
  margin: 0;
  min-height: 100%;
  max-height: 100vh;
  max-width: 1400px;
  background-color: #fff;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.05);
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overflow-y: auto;
  overflow-x: hidden;
  transform: translate3d(0, 0, 0);
  width: calc(100% - 60px);

  @media (min-width: 1023px) {
    width: calc(100% - 200px);
  }

  ul {
    margin: 0;
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

    if (slug) {
      // Start fetching the data in parallel with the dynamic import
      ProductResource.preload(cache, slug);
    }

    return (
      <Wrapper as="aside">
        <BackLink>
          <span>Back to home</span>
        </BackLink>
        <ProductBackground key={slug}>
          <ErrorBoundary>
            {slug && (
              <Suspense maxDuration={200} fallback={<WidePlaceholder />}>
                <ProductDetails slug={slug} />
              </Suspense>
            )}
          </ErrorBoundary>
        </ProductBackground>
      </Wrapper>
    );
  }
}
