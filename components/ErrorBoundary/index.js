import React, { Component } from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
`;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  componentDidCatch(error) {
    this.setState({ error: error.message });
  }
  render() {
    if (this.state.error) {
      return <Title>Error: {this.state.error}</Title>;
    }
    return this.props.children;
  }
}
