import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Svg = props => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient cx="25%" cy="25%" id="radialSpinnerGradient">
        <stop offset="25%" stopColor="white" />
        <stop offset="100%" stopColor="#857574" />
      </radialGradient>
    </defs>
    <circle
      cx="16"
      cy="16"
      fill="none"
      r="10"
      stroke="url(#radialSpinnerGradient)"
      strokeWidth={0.5}
    />
  </svg>
);

const Spinner = styled(Svg)`
  position: absolute;
  animation: ${spin} 540ms infinite linear;
  left: calc(50% - 50px);
  bottom: 40px;
  height: 100px;
`;

export default Spinner;
