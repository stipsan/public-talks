// list over stuff
import React, { Component, Placeholder } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import rafSchd from "raf-schd";
import cx from "classnames";

import TransitionWrapper from "../components/TransitionWrapper";
import ProductsList from "../components/ProductsList";

const Svg = styled.svg`
  position: absolute;
  left: 28px;
  top: 30px;
  width: 192px;
  transition: opacity 0.3s calc(var(--scroll-active) * 0.1s);
  opacity: calc(1 - var(--scroll-active));

  path {
    fill: white;
  }
`;
const Logo = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 610.667 52">
    <path d="M508.653 8.235l-2.436-.902-1.081-.361-1.083-.27-1.037-.226-1.083-.135-1.172-.09-1.308-.046-1.489.091-1.488.225-1.443.406-.677.27-.676.362-.587.405-.541.452-.45.541-.406.586-.361.677-.226.767-.18.812-.045.946.045.858.18.766.316.722.36.676.496.632.542.585.632.587.721.496 1.579.993 1.804.947 3.833 1.893 1.985 1.037 1.894 1.174.902.63.902.678.812.721.766.812.722.857.632.947.541.992.496 1.083.36 1.172.316 1.262.136 1.354.09 1.488-.09 1.894-.27 1.714-.453 1.624-.63 1.442-.722 1.308-.902 1.219-1.038 1.083-1.172.901-1.262.857-1.399.676-1.443.587-1.578.45-1.624.362-1.714.27-1.804.135-1.804.046-1.264-.046-1.306-.134-1.264-.182-1.263-.27-2.48-.631-2.436-.767.677-6.54 2.12.812 2.526.767 1.397.316 1.399.27 1.398.18 1.352.046 1.534-.09 1.669-.317.812-.27.767-.315.766-.407.767-.405.676-.541.632-.587.541-.63.496-.723.406-.811.27-.903.18-.946.091-1.038-.045-.992-.18-.902-.316-.858-.36-.766-.496-.722-.542-.676-.632-.586-.721-.587-1.579-1.083-1.804-.946-3.833-1.85-1.985-.992-1.894-1.082-1.804-1.218-.812-.676-.766-.721-.722-.767-.632-.857-.541-.947-.496-.993-.361-1.081-.315-1.219-.136-1.263-.09-1.353.09-1.577.225-1.49.407-1.397.496-1.31.677-1.171.766-1.127.902-.993.992-.856 1.128-.812 1.172-.678 1.308-.585 1.399-.496 1.443-.361 1.488-.271 1.578-.18 1.67-.045 2.525.089 2.616.361 2.705.542 1.308.361 1.263.405-.947 6.45M443.528.884h26.024v6.179h-18.988V21.36h18.176v6.179h-18.176v22.324h-7.036V.884M99.368.884h9.516l21.603 39.417h.136V.884h7.036v48.979h-8.976l-22.19-40.275h-.134v40.275h-6.991V.884M190.605 9.588c-3.426-2.255-7.125-3.383-13.438-3.383-11.322 0-18.808 8.208-18.808 19.168 0 11.5 8.253 19.123 18.446 19.123 4.826 0 6.088-.496 7.848-.812V28.801h-10.328v-5.773h17.364v25.481c-2.661.903-7.308 2.166-14.973 2.166-15.47 0-25.799-9.968-25.799-25.527 0-15.064 10.96-25.121 25.888-25.121 7.171 0 10.328 1.037 14.387 2.481l-.587 7.08M351.84.884h7.035v42.8h20.476v6.179H351.84V.884M426.616 29.568c0 13.755-6.945 21.107-19.032 21.107-12.043 0-18.988-7.352-18.988-21.107V.884h6.992v27.781c0 9.382 2.975 15.831 11.996 15.831 9.065 0 11.996-6.45 11.996-15.83V.883h7.036v28.684M527.867.884h27.465v6.179h-20.43V21.36h18.58v6.179h-18.58v16.145h20.43v6.179h-27.465V.884M571.523.884h9.561l21.604 39.417h.135V.884h7.036v48.979h-9.02L578.695 9.588h-.136v40.275h-7.036V.884M16.248.975l1.217.044 1.715.225 1.624.27 1.488.407 1.443.496 1.308.542 1.172.676 1.082.812.948.902.811.992.677 1.127.542 1.263.405 1.353.225 1.488.091 1.67-.045 1.217-.135 1.128-.227 1.082-.314.992-.362.947-.496.857-.541.812-.587.722-.721.676-.767.586-.812.587-.901.496-.948.45-1.037.406-1.082.361-1.128.316v.135l1.218.136 1.173.225 1.127.362 1.084.405.99.45.948.587.856.632.812.722.678.81.63.858.587.948.45.992.362 1.081.225 1.128.18 1.173.046 1.263-.091 1.893-.315 1.715-.452 1.533-.63 1.354-.812 1.217-.947 1.037-1.128.947-1.217.767-1.354.677-1.442.585-1.535.407-1.623.36-1.669.27-1.759.182-1.037.09h-.812l-1.85.045H.554V.884h13.259l1.895.045zm0 20.654l1.128-.225 1.037-.225.947-.271.901-.36.812-.407.723-.541.63-.63.542-.767.45-.858.317-.992.18-1.128.09-1.308-.09-1.037-.135-.947-.27-.857-.36-.767-.453-.676-.496-.586-.585-.496-.632-.451-.677-.407-.722-.27-.766-.27-.767-.226-1.533-.226h-.271l-1.308-.089H7.588v15.153h3.835l2.48-.045zm0 22.28l1.128-.134 1.037-.182.992-.27.947-.315.857-.407.767-.496.721-.541.632-.63.496-.767.451-.812.316-.947.18-1.083.045-1.173-.045-1.353-.225-1.172-.362-1.083-.496-.947-.586-.812-.722-.676-.765-.586-.859-.496-.946-.452-.992-.315-1.083-.27-1.083-.18h-.405l-1.85-.227-2.254-.044H7.588v16.55h5.232L15.165 44l1.083-.09M73.75 31.732L64.01 7.468l-9.787 24.264zm-9.74 5.773H52.011l-5.005 12.358h-7.352L60.536.884h7.397l20.7 48.979h-7.666l-4.96-12.358zm0-29.946l-9.787 24.173 9.786-24.264v.09M241.75 43.684l.27-.09 1.263-.406 1.128-.632.992-.81 4.51-4.511-8.164-8.119-1.758-1.713-4.466 4.465-.405.45-.405.497-.632 1.128-.226.63-.18.632-.136.631-.045.677v.676l.045.678.136.676.226.676.27.632.36.63.452.632.54.587.587.541.632.451.63.36.678.316.63.181.678.135.676.09h.676l.677-.045zm0-43.612l.451-.045.992.045.902.09.857.18.812.226 1.397.496 1.219.632.992.676.721.587.767.721-4.916 4.916-.541-.496-.812-.497-.496-.224-.542-.182-.63-.089-.722-.045-.452.09h-.405l-.903.226-.901.449-.812.588-.721.721-.542.902-.225.496-.136.541-.09.587-.045.632.046.766.18.676.225.632.27.496.542.767.316.36 3.201 3.203 13.08 13.124 4.96-4.962 4.916 4.962-4.96 4.916 6.946 6.945-4.916 4.961-6.946-6.945-4.465 4.464-.857.768-.947.721-1.037.676-1.128.542-1.218.496-1.217.406-1.308.315-.903.136h-.405l-1.353.044-1.398-.09-1.353-.225-1.399-.406-1.353-.542-1.308-.766-1.308-.947-1.263-1.128-1.172-1.263-.948-1.308-.721-1.352-.585-1.398-.362-1.398-.27-1.398-.046-1.354.046-1.353.18-1.352.27-1.308.407-1.217.496-1.174.585-1.128.632-1.037.678-.901.766-.858 4.464-4.42-1.126-1.172-.812-.902-.903-1.127-.812-1.399-.405-.766-.316-.856-.271-.903-.225-.947-.135-1.037-.045-1.083.045-1.128.18-1.172.27-1.082.406-1.128.496-1.038.541-1.037.678-.947.766-.901.856-.812.948-.723.992-.63 1.083-.587 1.127-.405 1.218-.362 1.307-.181.857-.044M314.316.072h1.353l1.354.09 1.306.135 1.264.226 1.218.27 1.217.316 1.128.406 1.128.45 1.036.452 1.037.587.994.585.946.632.902.676.858.767.856.767.767.812.721.857.676.947.678.948.585.992.541.992.542 1.082.857 2.21.721 2.345.271 1.217.227 1.263.134 1.264.135 1.308.09 1.352.046 1.353-.136 2.707-.27 2.66-.497 2.48-.721 2.39-.857 2.211-1.083 2.075-1.217 1.939-.676.902-.767.856-.767.812-.812.767-.857.721-.901.723-.948.63-.992.542-1.038.541-1.081.496-1.083.406-1.173.406-1.172.316-1.263.271-1.264.18-1.306.18-1.354.09h-2.75l-1.354-.09-1.308-.18-1.262-.18-1.219-.27-1.172-.317-1.172-.406-1.128-.406-1.037-.496-1.038-.541-.992-.541-.948-.631-.901-.723-.857-.721-.856-.767-.767-.812-.723-.856-.676-.902-.676-.947-.586-.992-.542-.993-.496-1.082-.902-2.21-.676-2.391-.271-1.217-.225-1.263-.316-2.66-.091-2.707.09-2.705.317-2.572.496-2.48.676-2.345.902-2.21 1.083-2.074 1.217-1.94.722-.947.721-.857.767-.812.812-.767.857-.767.947-.676.948-.632.946-.585 1.038-.587 1.082-.452 1.127-.45 1.128-.406 1.172-.316 1.264-.27 1.263-.226 1.308-.136 1.308-.089 1.397-.045zm0 44.424l2.03-.09 1.894-.317 1.759-.496 1.578-.721 1.488-.857 1.31-.992 1.17-1.172 1.083-1.263.903-1.399.766-1.488.676-1.578.542-1.668.406-1.715.315-1.759.136-1.804.09-1.804-.09-1.849-.181-1.85-.315-1.803-.45-1.714-.542-1.669-.677-1.579-.856-1.488-.903-1.397-1.083-1.264-1.217-1.172-1.308-.992-1.443-.812-1.578-.676-1.715-.496-.901-.181-.947-.135-1.94-.045-1.984.045-1.804.316-1.715.496-1.577.676-1.444.812-1.353.992-1.172 1.172-1.083 1.264-.947 1.397-.812 1.488-.676 1.579-.586 1.67-.407 1.713-.315 1.804-.226 1.849-.044 1.85.044 1.803.181 1.804.316 1.759.405 1.715.542 1.668.63 1.578.812 1.488.903 1.399 1.037 1.263 1.218 1.172 1.308.992 1.442.857 1.624.721 1.759.496.903.182.992.134.992.091h1.037" />
  </Svg>
);

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = props => (
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
const StyledSpinner = styled(Spinner)`
  position: absolute;
  animation: ${spin} 540ms infinite linear;
  left: calc(50% - 50px);
  bottom: 40px;
  height: 100px;
`;

const Wrapper = styled(TransitionWrapper)`
  text-align: center;

  transform: translateX(-100%);

  .router.index-route & {
    transform: translateX(0%);
  }
`;

const Credits = styled.footer`
  height: 110vh;
  margin-left: 60px;
  margin-right: 60px;
  background-color: #3c444d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -430px;
`;

export default class Index extends Component {
  state = { matched: !!this.props.match };

  scrollerRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    if (!props.match || state.matched) {
      return null;
    }

    return { matched: true };
  }

  componentDidMount() {
    //const scroller = ReactDOM.findDOMNode(this).closest(".route");
    const scroller = this.scrollerRef.current;

    const schedule = rafSchd(({ target: { scrollTop } }) => {
      scroller.style.setProperty("--scroll-top", `${scrollTop}px`);
      if (scrollTop > 50) {
        document.body.style.setProperty("--scroll-active", "1");
      } else {
        document.body.style.removeProperty("--scroll-active");
      }
    });
    const opts = { capture: true, passive: true };
    scroller.addEventListener("scroll", schedule, opts);
    this.unsubscribe = () => {
      schedule.cancel();
      scroller.removeEventListener("scroll", schedule, opts);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { matched } = this.state;

    return (
      <>
        <Logo />
        <Wrapper ref={this.scrollerRef}>
          <div className="hero">
            <svg className="logo">
              <desc>The logo</desc>
            </svg>
            <div className="copy">
              <h5>Wireless Speaker System</h5>
              <h1>
                Select your Bang &amp; Olufsen speakers for the perfect audio
                experience
              </h1>
            </div>
          </div>
          {matched && (
            <Placeholder delayMs={300} fallback={<StyledSpinner />}>
              <ProductsList />
              <Credits>
                Link to the{" "}
                <a
                  target="_blank"
                  href="https://www.bang-olufsen.com/en/collection/wireless-speaker-systems"
                >
                  original
                </a>{" "}
                etc.
              </Credits>
            </Placeholder>
          )}
        </Wrapper>
      </>
    );
  }
}
