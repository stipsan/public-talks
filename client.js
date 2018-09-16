import "@babel/polyfill";

import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder } from "react";
import { Router, Link } from "@reach/router";

const Header = props => <header {...props} />;

const Footer = props => <footer {...props} />;

// reach/router needs to render to know the route

const Main = ({ children }) => (
  <div>
    <Header />
    <h1>Welcome to the App!</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="checkout">Checkout</Link>
      </li>
      <li>
        <Link to="fancy-product">Fancy product</Link>
      </li>
    </ul>
    <hr />
    {children}
    <Footer />
  </div>
);
const Index = lazy(() => import("./pages/index"));
const Checkout = lazy(() => import("./pages/checkout"));
const Product = lazy(() => import("./pages/product"));

const RootFallback = "Loading...";

unstable_createRoot(document.getElementById("root")).render(
  <Main path="/">
    <Placeholder delayMs={0} fallback={RootFallback}>
      <Router>
        <Index default />
        <Checkout path="checkout" />
        <Product path=":slug" />
      </Router>
    </Placeholder>
  </Main>
);

window.Test = React;
