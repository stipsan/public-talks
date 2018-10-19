import React, { Component, Placeholder } from "react";
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

export const BackgroundVideo = () => (
  <div className="background-video">
    {ENABLE_AUTOPLAY ? <Video /> : <img src="/assets/BO-BG-final.jpg" />}
  </div>
);

export const SelectionBackground = styled.aside.attrs({
  className: "selection-background"
})``;
