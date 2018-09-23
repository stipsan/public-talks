import "@babel/polyfill";
import "intersection-observer";

import PropTypes from "prop-types";
import cx from "classnames";
import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder, Component } from "react";
import { Match, Location } from "@reach/router";
import styled from "styled-components";

import Index from "./pages";
import Product from "./pages/product";
import { Main } from "./components/Backgrounds/video";

// Wrap each of these in custom placeholder components to maximize UX
//const Index = lazy(() => import("./pages/index"));
const Checkout = lazy(() => import("./pages/checkout"));

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
    return children({ match, location, didRender });
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

const SelectionWrapper = styled(TransitionWrapper)`
  transform: translateX(100%);

  .router.selection-route &.mounted {
    transform: translateX(0%);
  }
`;

unstable_createRoot(document.getElementById("root")).render(
  <Main>
    <TransitionRouter2>
      <Match path="/">{props => <Index {...props} />}</Match>
      <Match path="selection">
        {props => (
          <SelectionWrapper className={cx({ mounted: props.didRender })}>
            <Placeholder delayMs={300} fallback={"Loading selection..."}>
              <Checkout {...props} />
            </Placeholder>
          </SelectionWrapper>
        )}
      </Match>
      <Match path="product/:slug">{props => <Product {...props} />}</Match>
    </TransitionRouter2>
  </Main>
);
