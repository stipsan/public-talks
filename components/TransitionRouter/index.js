import React from "react";
import { Router, Location } from "@reach/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import cx from "classnames";

const TransitionRouter = props => (
  <Location>
    {({ location }) => (
      <TransitionGroup appear component={null}>
        <CSSTransition key={location.key} classNames="router" timeout={800}>
          <Router
            location={location}
            component="section"
            className={cx("router", {
              "index-route": location.pathname === "/",
              "product-route": location.pathname.startsWith("/product"),
              "selection-route": location.pathname.endsWith("/selection")
            })}
          >
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

export default TransitionRouter;
