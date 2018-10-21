import styled from "styled-components";

const TransitionWrapper = styled.section`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  transition: transform var(--slide-duration);

  > * {
    transform: translate3d(0, 0, 0);
  }
`;

export default TransitionWrapper;
