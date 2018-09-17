import "@babel/polyfill";

import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder } from "react";
import { Router, Link, Location } from "@reach/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
        <Link to="selection">Checkout</Link>
      </li>
      <li>
        <Link to="product/fancy-product">Fancy product</Link>
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

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames={`slide-${
            location.pathname.startsWith("/product/") ? "left" : "right"
          }`}
          timeout={5000}
        >
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

unstable_createRoot(document.getElementById("root")).render(
  <Main path="/">
    <Placeholder delayMs={0} fallback={RootFallback}>
      <FadeTransitionRouter>
        <Index default />
        <Checkout path="selection" />
        <Product path="product/:slug" />
      </FadeTransitionRouter>
    </Placeholder>
  </Main>
);
