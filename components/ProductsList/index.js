// list over stuff
import React, { Component, unstable_Suspense as Suspense } from "react";
import { Link } from "@reach/router";
import { cache, ImageResource, ProductsResource } from "../../api";
import { SquarePlaceholder } from "../Placeholders";
import {
  ProductWrapper,
  Title,
  Subtitle,
  HoverThumbnail,
  ButtonsWrapper,
  Button,
  MasonryColumns
} from "./MasonryColumns";

const ImageLoader = props => <img src={ImageResource.read(cache, props.src)} />;

const ParallaxProduct = props => {
  const { title, subtitle, thumbnail, thumbnailHover, slug, placement } = props;

  return (
    <ProductWrapper>
      <Link to={`/${slug}`}>
        <Suspense maxDuration={200} fallback={<SquarePlaceholder />}>
          <ImageLoader src={thumbnail} />
        </Suspense>

        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <p>Placement:</p>
        <p>{placement}</p>
        <HoverThumbnail imgUrl={thumbnailHover} />
        <ButtonsWrapper>
          <Button>Learn more</Button>
        </ButtonsWrapper>
      </Link>
    </ProductWrapper>
  );
};

export default class ProductsList extends Component {
  render() {
    const products = ProductsResource.read(cache);

    return (
      <MasonryColumns>
        {products.map(product => (
          <ParallaxProduct key={product.slug} {...product} />
        ))}
      </MasonryColumns>
    );
  }
}
