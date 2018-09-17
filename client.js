import "@babel/polyfill";

import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder } from "react";
import { Router, Link, Location } from "@reach/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Header = props => <header {...props} />;

const Footer = props => <footer {...props} />;

// @TODO remove this
const ENABLE_AUTOPLAY = false;

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
    <div className="background-video">
      <video
        loop
        autoPlay={ENABLE_AUTOPLAY}
        playsInline
        muted
        webkit-playsinline="true"
      >
        <source src="/assets/BO-BG-final.mp4" type="video/mp4" />
      </video>
    </div>
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
      <TransitionGroup appear component={null}>
        <CSSTransition
          key={location.key}
          classNames={`slide-${
            location.pathname.endsWith("/selection") ? "right" : "left"
          }`}
          timeout={800}
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
