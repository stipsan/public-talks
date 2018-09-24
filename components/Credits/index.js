import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  height: 110vh;
  margin-left: 60px;
  margin-right: 60px;
  background-color: #3c444d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0px;

  h3 {
  }

  a {
    color: white;
  }
`;

const Credits = () => (
  <Footer>
    <strong>This React Suspense demo is based on:&nbsp;</strong>
    <br />
    <a
      target="_blank"
      href="https://www.bang-olufsen.com/en/collection/wireless-speaker-systems"
    >
      bang-olufsen.com/en/collection/wireless-speaker-systems
    </a>
    <br />
    All rights for the product photos, videos and the overall design belongs to
    Bang & Olufsen.
  </Footer>
);

export default Credits;
