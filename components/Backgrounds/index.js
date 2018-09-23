import React, { Component, Placeholder } from "react";
import styled from "styled-components";

// @TODO remove this, replace with placeholder logic for the image
const ENABLE_AUTOPLAY = true;

export const BackgroundVideo = () => (
  <div className="background-video">
    {ENABLE_AUTOPLAY ? (
      <video
        loop
        autoPlay
        playsInline
        muted
        poster="/assets/BO-BG-final.jpg"
        webkit-playsinline="true"
      >
        <source src="/assets/BO-BG-final.mp4" type="video/mp4" />
      </video>
    ) : (
      <img src="/assets/BO-BG-final.jpg" />
    )}
  </div>
);

export const SelectionBackground = styled.aside.attrs({
  className: "selection-background"
})``;
