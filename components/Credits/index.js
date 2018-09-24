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
  margin-top: 0px;
`;

const Credits = () => (
  <Footer>
    Link to the&nbsp;
    <a
      target="_blank"
      href="https://www.bang-olufsen.com/en/collection/wireless-speaker-systems"
    >
      original
    </a>
    &nbsp; etc.
  </Footer>
);

export default Credits;
