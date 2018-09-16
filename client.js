import { unstable_createRoot } from "react-dom";
import { lazy, Placeholder } from "react";

const Header = props => <header {...props} />;

const Footer = props => <footer {...props} />;
console.log("Client!!");

const Index = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve(import("./pages")), 5000);
    })
);

unstable_createRoot(document.getElementById("root")).render(
  <Placeholder delayMs={2000} fallback={"Loading…"}>
    <Header />
    <Index />
    <Footer />
  </Placeholder>
);
