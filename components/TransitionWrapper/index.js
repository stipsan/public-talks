import styled from "styled-components";

const TransitionWrapper = styled.section`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform var(--slide-duration);

  > * {
    transform: translate3d(0, 0, 0);
  }
`;

export default TransitionWrapper;
