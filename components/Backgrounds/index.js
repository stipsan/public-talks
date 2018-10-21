import React, { Component } from "react";
import styled from "styled-components";

// @TODO remove this, replace with placeholder logic for the image
const ENABLE_AUTOPLAY = true;

class Video extends Component {
  videoRef = React.createRef();

  componentDidMount() {
    // Workaround the muted attribute not being in the DOM, causing the bg video not to play on iOS
    this.videoRef.current.defaultMuted = true;
    this.videoRef.current.play();
  }

  render() {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/BO-BG-final.jpg"
        webkit-playsinline="true"
        ref={this.videoRef}
      >
        <source src="/assets/BO-BG-final.mp4" type="video/mp4" />
      </video>
    );
  }
}

const Wrapper = styled.div`
  transform-style: none;
  z-index: -2;
  position: fixed;
  left: 41.5%;
  top: 0;
  right: 0;
  bottom: 0;
  width: 58.5%;
  background: #000;
  background-image: none;
  transition: transform 0.8s;
  overflow: hidden;
  contain: strict;

  video,
  img {
    position: absolute;
    top: 50%;
    left: 50%;

    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    transition: filter 0.8s;
    will-change: filter;
    filter: blur(calc(var(--scroll-active) * 100px));
  }
  .router:not(.index-route) ~ & {
    --scroll-active: 1;
  }

  @media (max-width: 1023px) {
    left: 80px;
    right: 0;
    width: auto;
  }
`;

export const BackgroundVideo = () => (
  <Wrapper>
    {ENABLE_AUTOPLAY ? <Video /> : <img src="/assets/BO-BG-final.jpg" />}
  </Wrapper>
);

export const SelectionBackground = styled.aside`
  background: var(--selectionBackground);
  z-index: -1;
  position: fixed;
  left: 100px;
  top: 0;
  right: 0;
  bottom: 0;
  transform: translateX(100%) translateX(-100px);
  transition: transform 0.8s;

  .product-route ~ & {
    transform: translateX(100%);
  }

  @media (max-width: 1023px) {
    transform: translateX(100%) translateX(-40px);
  }
`;
