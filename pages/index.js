// list over stuff
import React, { PureComponent } from "react";
import styled from "styled-components";
import { unstable_scheduleWork } from "scheduler";

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

const Wrapper = styled.div`
  text-align: center;
`;
let restoreScrollTop = 0;
export default class Index extends PureComponent {
  state = { scrollTop: 0 };

  scrollerRef = React.createRef();

  componentDidMount() {
    this.scrollerRef.current.scrollTop = restoreScrollTop;
  }

  handleScroll = event => {
    const { scrollTop } = event.target;

    unstable_scheduleWork(() => {
      //requestAnimationFrame(() => {
      this.setState({ scrollTop });
    });
  };

  componentWillUnmount() {
    restoreScrollTop = this.state.scrollTop;
  }

  render() {
    return (
      <Wrapper
        className="main-scroller"
        ref={this.scrollerRef}
        onScroll={this.handleScroll}
        style={{ "--scroll-top": `${this.state.scrollTop}px` }}
      >
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
      </Wrapper>
    );
  }
}
