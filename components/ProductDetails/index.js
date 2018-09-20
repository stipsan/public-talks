// list over stuff
import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Hero = styled.header`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.4%;
`;

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
const SuperVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
`;
const FooterImage = styled.img`
  width: 100%;
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
    const {
      heroImage,
      heroVideo,
      footerImage,
      largeThumbnail
    } = this.state.product;

    return (
      <>
        <Hero>
          {heroVideo ? (
            <SuperVideo
              // the key ensures that no matter how quickly you switch between two products with videos you're not stuck with the first video
              key={heroVideo}
              loop
              autoPlay
              playsInline
              muted
              webkit-playsinline="true"
            >
              <source src={heroVideo} type="video/mp4" />
            </SuperVideo>
          ) : (
            <SuperImage imgUrl={heroImage} />
          )}
        </Hero>
        <img src={largeThumbnail} />
        <FooterImage src={footerImage} />
      </>
    );
  }
}
