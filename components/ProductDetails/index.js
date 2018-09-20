// list over stuff
import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const SuperImage = styled.div`
  background-image: ${props =>
    props.imgUrl ? `url(${JSON.stringify(props.imgUrl)})` : "none"};
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

let cache = {};
export default class ProductDetails extends Component {
  state = { product: cache };

  async componentDidMount() {
    const { slug } = this.props;
    const res = await fetch(`/api/products/${slug}`);
    this.setState({ product: await res.json() }, () => {
      cache = this.state.product;
    });
  }

  render() {
    const { heroImage } = this.state.product;

    return (
      <>
        <SuperImage imgUrl={heroImage} />
      </>
    );
  }
}
