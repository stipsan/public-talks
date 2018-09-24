import React, { Component, Placeholder } from "react";
import styled from "styled-components";
import {
  cache,
  ProductResource,
  ImageResource,
  VideoResource
} from "../../api";
import { AnimatedSvg } from "../ImagePlaceholder";

const Hero = styled.header`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.4%;
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
    width: 50%;
  }
`;

const LargeThumbnailWrapper = styled.div`
  margin-right: 40px;
`;
const LargeThumbnailImg = styled.img`
  width: 100%;
`;
const LargeThumbnail = ({ src }) => (
  <LargeThumbnailImg src={ImageResource.read(cache, src)} />
);

const Details = styled.div`
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
const LargeThumbnailFallback = styled(AnimatedSvg)``;

const SuperHero = props => {
  const { heroVideo, heroImage } = props;
  return (
    <Hero>
      {heroVideo ? (
        <SuperVideo loop autoPlay playsInline muted webkit-playsinline="true">
          <source src={VideoResource.read(cache, heroVideo)} type="video/mp4" />
        </SuperVideo>
      ) : (
        <SuperImage imgUrl={ImageResource.read(cache, heroImage)} />
      )}
    </Hero>
  );
};

export default class ProductDetails extends Component {
  /*
  state = { product: {} };

  async componentDidMount() {
    const { slug } = this.props;
    const res = await fetch(`/api/products/${slug}`);
    this.setState({ product: await res.json() });
    
  }
  //*/

  render() {
    const {
      heroImage,
      heroVideo,
      footerImage,
      largeThumbnail,
      content
      //} = this.state.product;
    } = ProductResource.read(cache, this.props.slug);

    return (
      <>
        <Placeholder
          delayMs={300}
          fallback={
            <LargeThumbnailFallback>
              <rect width="100" height="100" fill="transparent" />
            </LargeThumbnailFallback>
          }
        >
          <SuperHero heroImage={heroImage} heroVideo={heroVideo} />
        </Placeholder>
        <Content>
          <LargeThumbnailWrapper>
            <Placeholder
              delayMs={300}
              fallback={
                <LargeThumbnailFallback>
                  <rect width="100" height="100" fill="transparent" />
                </LargeThumbnailFallback>
              }
            >
              <LargeThumbnail src={largeThumbnail} />
            </Placeholder>
          </LargeThumbnailWrapper>
          <Details>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Details>
        </Content>
        <FooterImage src={footerImage} />
      </>
    );
  }
}
