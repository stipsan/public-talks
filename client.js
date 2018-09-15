import { unstable_createRoot } from "react-dom";
import { lazy, Placeholder } from "react";

console.log("Client!!");

const Index = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve(import("./pages")), 5000);
    })
);

unstable_createRoot(document.getElementById("app")).render(
  <Placeholder delayMs={2000} fallback={"Loading…"}>
    <Index />
  </Placeholder>
);
