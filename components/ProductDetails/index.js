import React, { Component, unstable_Suspense as Suspense } from "react";
import {
  cache,
  ProductResource,
  ImageResource,
  VideoResource
} from "../../api";
import { SquarePlaceholder, WidePlaceholder } from "../Placeholders";
import {
  Hero,
  SuperVideo,
  SuperImage,
  HeroTitle,
  Content,
  LargeThumbnailWrapper,
  Details,
  FooterImage
} from "./styles";

const ImageLoader = props => <img src={ImageResource.read(cache, props.src)} />;

const SuperHero = props => {
  const { heroVideo, heroImage, children } = props;
  return (
    <Hero>
      {heroVideo ? (
        <SuperVideo loop autoPlay playsInline muted webkit-playsinline="true">
          <source src={VideoResource.read(cache, heroVideo)} type="video/mp4" />
        </SuperVideo>
      ) : (
        <SuperImage imgUrl={ImageResource.read(cache, heroImage)} />
      )}
      {children}
    </Hero>
  );
};

export default class ProductDetails extends Component {
  render() {
    const {
      heroImage,
      heroVideo,
      footerImage,
      largeThumbnail,
      content,
      title
    } = ProductResource.read(cache, this.props.slug);

    return (
      <>
        <Suspense maxDuration={200} fallback={<WidePlaceholder />}>
          <SuperHero heroImage={heroImage} heroVideo={heroVideo}>
            <HeroTitle>{title}</HeroTitle>
          </SuperHero>
        </Suspense>
        <Content>
          <LargeThumbnailWrapper>
            <Suspense maxDuration={200} fallback={<SquarePlaceholder />}>
              <ImageLoader src={largeThumbnail} />
            </Suspense>
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
