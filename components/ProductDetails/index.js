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

const AddToSelection = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #1e1e1e;
  height: 42px;
  line-height: 42px;
  border: 1px solid #505050;
  padding: 0 30px;
  transition: all 0.3s;

  &:after {
    content: " +";
  }

  &:hover {
    background: #505050;
    color: white;
  }
`;

const Content = styled.article`
  display: flex;
  margin-top: 100px;
  padding-left: 60px;
  padding-right: 60px;
  align-items: flex-start;

  > * {
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 50%;
  }
`;

const LargeThumbnail = styled.img``;

const Details = styled.div`
  color: #4a4a4a;

  p {
    margin: 8px 0 50px;
    color: #505050;
    font-weight: 400;
  }

  h3,
  h4 {
    color: #4a4a4a;
  }

  h3 {
    margin: 0 0 50px;
    font-size: 18px;
  }

  h4 {
    line-height: 1;
    margin: 0;
    font-weight: 500;
  }

  h4 + p {
    margin-bottom: 30px;
  }
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
  margin-top: 100px;
  margin-bottom: -7px;
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
      largeThumbnail,
      content
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
        <Content>
          <LargeThumbnail src={largeThumbnail} />
          <Details>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <AddToSelection to="/selection">Add to selection</AddToSelection>
          </Details>
        </Content>
        <FooterImage src={footerImage} />
      </>
    );
  }
}
