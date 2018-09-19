// list over stuff
import React, { Component } from "react";
import styled from "styled-components";

import ProductsList from "../components/ProductsList";

const Wrapper = styled.div`
  text-align: center;
`;
let restoreScrollTop = 0;
export default class Index extends Component {
  state = { scrollTop: 0 };

  scrollerRef = React.createRef();

  componentDidMount() {
    this.scrollerRef.current.scrollTop = restoreScrollTop;

    this.scrollerRef.current.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => this.setState({ scrollTop: event.target.scrollTop });

  componentDidUpdate(prevProps, prevState) {
    console.log("scrollTop", this.state.scrollTop, prevState.scrollTop);
  }

  componentWillUnmount() {
    restoreScrollTop = this.scrollerRef.current.scrollTop;

    this.scrollerRef.current.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Wrapper className="main-scroller" ref={this.scrollerRef}>
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
      </Wrapper>
    );
  }
}
