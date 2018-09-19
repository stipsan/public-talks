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

  /*
	 * Use the same CSS variable as specified in our instance.
	 */
  opacity: var(--opacity);
  /*
	 * The will-change CSS property provides a way for authors to hint browsers about the kind of changes
	 * to be expected on an element, so that the browser can setup appropriate optimizations ahead of time
	 * before the element is actually changed.
	 */
  will-change: opacity;
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

const ProductWrapper = styled.li`
  break-inside: avoid;
  color: black;
  margin: 0;
  padding: 10px;
  padding-bottom: 30px;

  > a {
    display: block;
    background: white;
    padding-bottom: 20px;
  }

  img {
    width: 100%;
  }

  p {
    font-size: 11px;
    line-height: 18px;
    color: #787878;
    margin: 0;
  }
`;
const ParallaxProduct = props => {
  const { title, subtitle, thumbnail, slug, placement } = props;
  return (
    <ProductWrapper>
      <Link to={`/product/${slug}`}>
        <img src={thumbnail} />
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <p>Placement</p>
        <p>{placement}</p>
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
