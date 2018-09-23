// list over stuff
import React, { Component, Placeholder } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import rafSchd from "raf-schd";
import cx from "classnames";

import TransitionWrapper from "../components/TransitionWrapper";
import ProductsList from "../components/ProductsList";

history.scrollRestoration = "manual";

const Wrapper = styled(TransitionWrapper)`
  text-align: center;

  transform: translateX(-100%);

  .router.index-route & {
    transform: translateX(0%);
  }
`;

const Credits = styled.footer`
  height: 110vh;
  margin-left: 60px;
  margin-right: 60px;
  background-color: #3c444d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -430px;
`;

export default class Index extends Component {
  state = { matched: !!this.props.match };

  scrollerRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    if (!props.match || state.matched) {
      return null;
    }

    return { matched: true };
  }

  componentDidMount() {
    //const scroller = ReactDOM.findDOMNode(this).closest(".route");
    const scroller = this.scrollerRef.current;

    const schedule = rafSchd(({ target: { scrollTop } }) => {
      scroller.style.setProperty("--scroll-top", `${scrollTop}px`);
      if (scrollTop > 0) {
        document.body.style.setProperty("--scroll-active", "1");
      } else {
        document.body.style.removeProperty("--scroll-active");
      }
    });
    const opts = { capture: true, passive: true };
    scroller.addEventListener("scroll", schedule, opts);
    this.unsubscribe = () => {
      schedule.cancel();
      scroller.removeEventListener("scroll", schedule, opts);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { matched } = this.state;

    return (
      <Wrapper ref={this.scrollerRef}>
        <div className="hero">
          <svg className="logo">
            <desc>The logo</desc>
          </svg>
          <div className="copy">
            <h5>Wireless Speaker System</h5>
            <h1>
              Select your Bang &amp; Olufsen speakers for the perfect audio
              experience
            </h1>
          </div>
        </div>
        {matched && (
          <Placeholder delayMs={300} fallback={"Loading products..."}>
            <ProductsList />
            <Credits>
              Link to the{" "}
              <a
                target="_blank"
                href="https://www.bang-olufsen.com/en/collection/wireless-speaker-systems"
              >
                original
              </a>{" "}
              etc.
            </Credits>
          </Placeholder>
        )}
      </Wrapper>
    );
  }
}
