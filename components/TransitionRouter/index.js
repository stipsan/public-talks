import React from "react";
import cx from "classnames";
import { Location } from "@reach/router";

const getRouterClassName = location =>
  cx("router", {
    "index-route": location.pathname === "/",
    "product-route": location.pathname !== "/"
  });

const TransitionRouter = props => (
  <Location>
    {({ location }) => (
      <div className={getRouterClassName(location)}>{props.children}</div>
    )}
  </Location>
);

export default TransitionRouter;
