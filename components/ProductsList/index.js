// list over stuff
import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const MasonryColumns = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 60px;
  padding-right: 60px;
  column-count: 4;
  column-gap: 20px;
  column-fill: balance-all;
  position: relative;
  top: -300px;
`;

const Title = styled.h2`
  color: #000;
  font-size: 15px;
  line-height: 24px;
  margin: 0 0 5px;
  font-weight: 500;
`;
const Subtitle = styled.p`
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: -5px;
  margin-bottom: 7px;
`;

const HoverThumbnail = styled.div`
  background-image: ${props =>
    props.imgUrl ? `url(${JSON.stringify(props.imgUrl)})` : "none"};
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ProductWrapper = styled.li`
  break-inside: avoid;
  color: black;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;

  will-change: transform;
  perspective: 1000;
  backface-visibility: hidden;

  &:nth-child(1),
  &:nth-child(2) {
    transform: translate3d(0, 86px, 0);
    transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 86px), 0);
  }
  &:nth-child(3),
  &:nth-child(4) {
    transform: translate3d(0, 161px, 0);
    transform: translate3d(0, calc((var(--scroll-top) * -0.3) + 161px), 0);
  }
  &:nth-child(5),
  &:nth-child(6) {
    transform: translate3d(0, 300px, 0);
    transform: translate3d(0, calc((var(--scroll-top) * -0.3) + 300px), 0);
  }
  &:nth-child(7),
  &:nth-child(8) {
    transform: translate3d(0, 241px, 0);
    transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 241px), 0);
  }

  > a {
    display: block;
    background: white;
    padding-bottom: 20px;
    position: relative;
  }

  img {
    width: 100%;
  }

  ${HoverThumbnail} {
    opacity: 0;
  }

  &:hover ${HoverThumbnail} {
    opacity: 1;
  }

  /* @TODO cheap trick to target chrome, refactor away from columns to fix box shadow issues in safari */
  @supports (contain: strict) {
    ${HoverThumbnail} {
      box-shadow: none;
      will-change: box-shadow;
      transition: box-shadow 0.5s;
    }

    &:hover ${HoverThumbnail} {
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.25);
    }
  }

  p {
    font-size: 11px;
    line-height: 18px;
    color: #787878;
    margin: 0;
  }
`;

const ParallaxProduct = props => {
  const { title, subtitle, thumbnail, thumbnailHover, slug, placement } = props;
  return (
    <ProductWrapper>
      <Link to={`/product/${slug}`}>
        <img src={thumbnail} />
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <p>Placement</p>
        <p>{placement}</p>
        <HoverThumbnail imgUrl={thumbnailHover} />
      </Link>
    </ProductWrapper>
  );
};

let cache = [];
export default class ProductsList extends Component {
  state = { products: cache };

  async componentDidMount() {
    const res = await fetch("/api/products");
    this.setState({ products: await res.json() }, () => {
      cache = this.state.products;
    });
  }

  render() {
    const { products } = this.state;

    return (
      <MasonryColumns>
        {products.map(product => (
          <ParallaxProduct key={product.slug} {...product} />
        ))}
      </MasonryColumns>
    );
  }
}
