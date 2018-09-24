import styled from "styled-components";

export const MasonryColumns = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 60px;
  padding-right: 60px;
  column-count: 4;
  column-gap: 20px;
  column-fill: balance-all;
  position: relative;
  top: -300px;
  margin-bottom: -200px;
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
  padding-bottom: 20px;

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
