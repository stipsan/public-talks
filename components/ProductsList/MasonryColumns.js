import styled from "styled-components";

export const MasonryColumns = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 15px;
  column-count: 4;
  column-gap: 15px;
  column-fill: balance;
  position: relative;
  top: -300px;
  margin-bottom: -300px;

  @media (min-width: 768px) {
    padding-left: 60px;
    padding-right: 60px;
    column-gap: 20px;
  }

  /* CSS columns is too buggy on this size for some reason, falling back to CSS grids while not allowing a true masonry layout at least it's stable */
  @media (max-width: 1023px) {
    column-count: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: min-content;
    margin-bottom: 300px;
  }
`;

export const Button = styled.span`
  border: 1px solid white;
  color: white;
  font-size: 13px;
  width: 100%;
  height: 42px;
  line-height: 32px;
  border-radius: 0;
  display: block;
  margin: 0 auto;
  font-weight: 500;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  padding: 6px 12px;

  &:hover {
    background: #fff;
    color: #505050;
  }
`;

export const Title = styled.h2`
  color: #000;
  font-size: 15px;
  line-height: 24px;
  margin: 0 0 5px;
  font-weight: 500;
`;

export const Subtitle = styled.p`
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: -5px;
  margin-bottom: 7px;
`;

export const HoverThumbnail = styled.div`
  background-image: ${props =>
    props.imgUrl ? `url(${JSON.stringify(props.imgUrl)})` : "none"};
  background-size: cover;
  background-color: #3c444d;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  max-width: 80%;
  opacity: 0;
  transition: none;
`;

export const ProductWrapper = styled.li`
  break-inside: avoid;
  color: black;
  margin: 0;
  padding: 0;
  padding-bottom: 15px;

  @media (min-width: 768px) {
    padding-bottom: 20px;
  }

  will-change: transform;
  perspective: 1000;
  backface-visibility: hidden;

  &:nth-child(1),
  &:nth-child(2) {
    transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 86px), 0);
  }
  &:nth-child(3),
  &:nth-child(4) {
    transform: translate3d(0, calc((var(--scroll-top) * -0.3) + 161px), 0);
  }
  &:nth-child(5),
  &:nth-child(6) {
    transform: translate3d(0, calc((var(--scroll-top) * -0.3) + 300px), 0);
  }
  &:nth-child(7),
  &:nth-child(8) {
    transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 241px), 0);
  }

  @media (max-width: 1023px) {
    /* the ordering is different in a CSS grid compared to columns */
    &:nth-child(1),
    &:nth-child(3) {
      transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 86px), 0);
    }
    &:nth-child(5),
    &:nth-child(7) {
      transform: translate3d(0, calc((var(--scroll-top) * -0.2) + 270px), 0);
    }
    &:nth-child(2),
    &:nth-child(4) {
      transform: translate3d(0, calc((var(--scroll-top) * -0.2) + 160px), 0);
    }
    &:nth-child(6),
    &:nth-child(8) {
      transform: translate3d(0, calc((var(--scroll-top) * -0.1) + 502px), 0);
    }
  }

  > a {
    display: block;
    background: white;
    padding-bottom: 20px;
    position: relative;
    height: 100%;
  }

  img {
    width: 100%;
  }

  ${HoverThumbnail} {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    box-shadow: none;
    will-change: box-shadow;
    transition: box-shadow 0.5s;
  }

  &:hover ${HoverThumbnail} {
    opacity: 1;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.25);
  }

  &:hover ${ButtonsWrapper} {
    opacity: 1;
    transition: opacity var(--slide-duration);
  }

  p {
    font-size: 11px;
    line-height: 18px;
    color: #787878;
    margin: 0;
  }
`;
