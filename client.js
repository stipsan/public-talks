import "@babel/polyfill";
import "intersection-observer";

import React from "react";
import ReactDOM from "react-dom";
import { Match } from "@reach/router";

import Index from "./pages";
import Product from "./pages/product";
import { BackgroundVideo, SelectionBackground } from "./components/Backgrounds";
import TransitionRouter from "./components/TransitionRouter";

// Create an async tree, this is required for the "suspend" bit to work
// <AsyncMode> also creates an async tree.
// Without async all the <Placeholder> elements will render fallbacks right away, ignoring the `delayMs` prop
ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <>
    <TransitionRouter>
      <Match path="/">{props => <Index {...props} />}</Match>
      <Match path=":slug">{props => <Product {...props} />}</Match>
    </TransitionRouter>
    <BackgroundVideo />
    <SelectionBackground />
  </>
);
