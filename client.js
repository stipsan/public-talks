import "@babel/polyfill";
import "intersection-observer";

import { unstable_createRoot } from "react-dom";
import React, { lazy, Placeholder } from "react";
import TransitionRouter from "./components/TransitionRouter";

const Footer = props => <footer {...props} />;

// @TODO remove this
const ENABLE_AUTOPLAY = false;

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
    <Footer />
  </>
);
const Index = lazy(() => import("./pages/index"));
const Checkout = lazy(() => import("./pages/checkout"));
const Product = lazy(() => import("./pages/product"));

const RootFallback = "Loading...";

unstable_createRoot(document.getElementById("root")).render(
  <Main>
    <Placeholder delayMs={0} fallback={RootFallback}>
      <TransitionRouter>
        <Index default />
        <Checkout path="selection" />
        <Product path="product/:slug" />
      </TransitionRouter>
    </Placeholder>
  </Main>
);
