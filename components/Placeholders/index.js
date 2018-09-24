import React from "react";
import styled, { keyframes } from "styled-components";

const placeHolderShimmer = keyframes`
  0%{
        background-position: 200% 0;
    }
    100%{
        background-position: -200% 0;
    }
`;

const AnimatedSvg = styled.svg.attrs({ width: "100%" })`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 400% 100%;
`;

export const WidePlaceholder = () => (
  <AnimatedSvg height="56.4%" viewBox="0 0 100 56.4">
    <rect width="100" height="56.4" fill="transparent" />
  </AnimatedSvg>
);

export const SquarePlaceholder = () => (
  <AnimatedSvg height="100%" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="transparent" />
  </AnimatedSvg>
);
