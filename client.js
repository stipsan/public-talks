import "@babel/polyfill";
import "intersection-observer";

import PropTypes from "prop-types";
import cx from "classnames";
import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder, Component } from "react";
import TransitionRouter from "./components/TransitionRouter";
import { Match, Router, Location } from "@reach/router";
import styled from "styled-components";

import Product from "./pages/product";

// @TODO remove this, replace with placeholder logic for the image
const ENABLE_AUTOPLAY = true;

const Main = ({ children }) => (
  <>
    {children}
    <div className="background-video">
      {ENABLE_AUTOPLAY ? (
        <video
          loop
          autoPlay
          playsInline
          muted
          poster="/assets/BO-BG-final.jpg"
          webkit-playsinline="true"
        >
          <source src="/assets/BO-BG-final.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/assets/BO-BG-final.jpg" />
      )}
    </div>
    <div className="selection-background" />
  </>
);

// Wrap each of these in custom placeholder components to maximize UX
const Index = lazy(() => import("./pages/index"));
const Checkout = lazy(() => import("./pages/checkout"));

// It works!!
const IndexRoute = props => (
  <Placeholder delayMs={300} fallback={"Loading index..."}>
    <Index {...props} />
  </Placeholder>
);
const ProductPlaceholder = <div className="product-background">Loading...</div>;
const ProductRoute = props => (
  <Placeholder delayMs={300} fallback={ProductPlaceholder}>
    <Product {...props} />
  </Placeholder>
);
const CheckoutRoute = props => (
  <Placeholder delayMs={300} fallback={"Loading selection..."}>
    <Checkout {...props} />
  </Placeholder>
);

class CSSTransition extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired
    })
  };

  state = { shouldRender: !!this.props.match, didRender: !!this.props.match };

  static getDerivedStateFromProps(props, state) {
    if (!props.match || state.shouldRender) {
      return null;
    }

    return { shouldRender: true };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldRender && !prevState.shouldRender) {
      requestAnimationFrame(() => this.setState({ didRender: true }));
    }
  }

  render() {
    const { children, match = {}, location } = this.props;
    const { shouldRender, didRender } = this.state;
    return children({ ...match, location, didRender });
  }
}
const TransitionMatch = ({ path, ...rest }) =>
  console.log({ rest }) || (
    <Match path={path}>
      {props =>
        console.log({ rest, props }) || <CSSTransition {...rest} {...props} />
      }
    </Match>
  );

const getRouterClassName = location =>
  cx("router", {
    "index-route": location.pathname === "/",
    "product-route": location.pathname.startsWith("/product"),
    "selection-route": location.pathname.endsWith("/selection")
  });

const TransitionRouter2 = props => (
  <Location>
    {({ location }) => (
      <div className={getRouterClassName(location)}>{props.children}</div>
    )}
  </Location>
);

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

const IndexWrapper = styled(TransitionWrapper)`
  text-align: center;

  transform: translateX(-100%);

  .router.index-route &.mounted {
    transform: translateX(0%);
  }
`;
const ProductWrapper = styled(TransitionWrapper)`
  transform: translateX(-100%);

  .router.product-route &.mounted {
    transform: translateX(0%);
  }
`;
const SelectionWrapper = styled(TransitionWrapper)`
  transform: translateX(100%);

  .router.selection-route &.mounted {
    transform: translateX(0%);
  }
`;

unstable_createRoot(document.getElementById("root")).render(
  <Main>
    <TransitionRouter2>
      <TransitionMatch
        path="/"
        fallback={<IndexWrapper>Loading index...</IndexWrapper>}
      >
        {props => (
          <IndexWrapper className={cx({ mounted: props.didRender })}>
            <Placeholder delayMs={300} fallback={"Loading index..."}>
              <Index {...props} />
            </Placeholder>
          </IndexWrapper>
        )}
      </TransitionMatch>
      <TransitionMatch path="selection">
        {props => (
          <SelectionWrapper className={cx({ mounted: props.didRender })}>
            <Placeholder delayMs={300} fallback={"Loading selection..."}>
              <Checkout {...props} />
            </Placeholder>
          </SelectionWrapper>
        )}
      </TransitionMatch>
      <TransitionMatch path="product/:slug">
        {props => <Product {...props} />}
      </TransitionMatch>
    </TransitionRouter2>
    {/*
    <TransitionRouter hidden>
      <IndexRoute default />
      <CheckoutRoute path="selection" />
      <ProductRoute path="product/:slug" />
    </TransitionRouter>*/}
  </Main>
);
