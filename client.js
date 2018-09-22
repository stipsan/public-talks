import "@babel/polyfill";
import "intersection-observer";

import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder } from "react";
import TransitionRouter from "./components/TransitionRouter";

const Footer = props => <footer {...props} />;

// @TODO remove this
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
const Product = lazy(() => import("./pages/product"));

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

unstable_createRoot(document.getElementById("root")).render(
  <Main>
    <TransitionRouter>
      <IndexRoute default />
      <CheckoutRoute path="selection" />
      <ProductRoute path="product/:slug" />
    </TransitionRouter>
  </Main>
);
