import React, { Component, Placeholder, lazy } from "react";
import styled from "styled-components";

import TransitionWrapper from "../components/TransitionWrapper";
import ErrorBoundary from "../components/ErrorBoundary";
import { WidePlaceholder } from "../components/Placeholders";
import { loadProductDetailsComponent } from "../api";
import BackLink from "../components/BackLink";
import { cache, ProductResource } from "../api";

const ProductDetails = lazy(loadProductDetailsComponent);

const Wrapper = styled(TransitionWrapper)`
  transform: translateX(-100%);
  perspective: 1000;
  backface-visibility: hidden;

  .router.product-route & {
    transform: translateX(0%);
  }
`;

const ProductBackground = styled.div.attrs({
  className: "product-background"
})`
  color: #4a4a4a;
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
              <Placeholder delayMs={0} fallback={<WidePlaceholder />}>
                <ProductDetails slug={slug} />
              </Placeholder>
            )}
          </ErrorBoundary>
        </ProductBackground>
      </Wrapper>
    );
  }
}
