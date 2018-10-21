import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  height: 60vh;
  background-color: #3c444d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px;
  margin-top: 0px;
  margin-left: 15px;
  margin-right: 15px;

  @media (min-width: 768px) {
    margin-left: 60px;
    margin-right: 60px;
  }

  h3 {
  }

  a {
    color: white;
  }
`;

const Brand = styled.strong`
  white-space: nowrap;
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
    <span>
      All rights for the product photos, videos and the overall design belongs
      to&nbsp;
      <Brand>Bang & Olufsen</Brand>
    </span>
    <br />
    <strong>
      <a
        target="_blank"
        href="https://github.com/stipsan/public-talks/tree/24-09-2018-react-suspense"
      >
        Source
      </a>
    </strong>
  </Footer>
);

export default Credits;
