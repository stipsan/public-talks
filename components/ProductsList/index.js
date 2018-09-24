// list over stuff
import React, { Component, Placeholder } from "react";
import { Link } from "@reach/router";
import {
  cache,
  ImageResource,
  ProductsResource,
  loadProducts,
  loadImage
} from "../../api";
import { SquarePlaceholder } from "../Placeholders";
import Spinner from "../Spinner";
import {
  ProductWrapper,
  Title,
  Subtitle,
  HoverThumbnail,
  ButtonsWrapper,
  Button,
  MasonryColumns
} from "./MasonryColumns";

//*/
class ImageLoader extends Component {
  state = { src: null };

  async componentDidMount() {
    const src = await loadImage(this.props.src);
    this.setState({ src });
  }

  render() {
    const { src } = this.state;

    return src ? <img src={src} /> : <SquarePlaceholder />;
  }
}
//*/
/*
const ImageLoader = props => (
  <img src={ImageResource.read(cache, props.src)} />
);
//*/

const ParallaxProduct = props => {
  const { title, subtitle, thumbnail, thumbnailHover, slug, placement } = props;

  return (
    <ProductWrapper>
      <Link to={`/${slug}`}>
        <ImageLoader src={thumbnail} />
        {/*
      <Placeholder delayMs={200} fallback={<SquarePlaceholder />}>
        <ImageLoader src={thumbnail} />
      </Placeholder>
      */}
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
  ///*

  state = { products: [], pastDelay: false };

  async componentDidMount() {
    const timeout = setTimeout(() => this.setState({ pastDelay: true }), 200);
    const products = await loadProducts();
    clearTimeout(timeout);
    this.setState({ products });
  }

  render() {
    const { products, pastDelay } = this.state;

    if (products.length === 0) {
      return pastDelay ? <Spinner /> : null;
    }
    //*/

    /*
    render() {
      const products = ProductsResource.read(cache);
      //*/

    return (
      <MasonryColumns>
        {products.map(product => (
          <ParallaxProduct key={product.slug} {...product} />
        ))}
      </MasonryColumns>
    );
  }
}
