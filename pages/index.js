// list over stuff
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import rafSchd from "raf-schd";
import cx from "classnames";

import ProductsList from "../components/ProductsList";

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
  componentDidMount() {
    const scroller = ReactDOM.findDOMNode(this).closest(".route");

    const schedule = rafSchd(({ target: { scrollTop } }) => {
      document.body.style.setProperty("--scroll-top", `${scrollTop}px`);
      if (scrollTop > 0) {
        document.body.style.setProperty("--background-video-blur", "100px");
      } else {
        document.body.style.removeProperty("--background-video-blur");
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
    return (
      <>
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
      </>
    );
  }
}
