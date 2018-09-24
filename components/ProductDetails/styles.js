import styled from "styled-components";
export const Hero = styled.header`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.4%;
`;
export const Content = styled.article`
  display: flex;
  margin-top: 100px;
  padding-left: 60px;
  padding-right: 60px;
  align-items: flex-start;

  > * {
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    width: 50%;
  }
`;
export const LargeThumbnailWrapper = styled.div`
  margin-right: 40px;

  img {
    width: 100%;
  }
`;
export const Details = styled.div`
  p {
    margin: 8px 0 50px;
    color: #505050;
    font-weight: 400;
  }

  h3,
  h4 {
    color: #4a4a4a;
  }

  h3 {
    margin: 0 0 50px;
    font-size: 18px;
  }

  h4 {
    line-height: 1;
    margin: 0;
    font-weight: 500;
  }

  h4 + p {
    margin-bottom: 30px;
  }
`;
export const SuperImage = styled.div`
  background-image: ${props =>
    props.imgUrl ? `url(${JSON.stringify(props.imgUrl)})` : "none"};
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const SuperVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
`;
export const FooterImage = styled.img`
  margin-top: 100px;
  margin-bottom: -7px;
  width: 100%;
`;
export const HeroTitle = styled.h1`
  color: white;
  position: absolute;
  left: 0;
  top: 39%;
  right: 0;
  text-align: center;
  font-size: 40px;
  line-height: 50px;
  transform: translate3d(0, 0, 0);
`;
