import React from "react";
import styled, { css, keyframes } from "styled-components";

const Loading = ({ type = "spinner" }) => {
  const switchRender = () => {
    if (type === "spinner") {
      return (
        <SpinnerWrapper>
          <Spinner></Spinner>
        </SpinnerWrapper>
      );
    } else if (type === "dotted") {
      return (
        <DottedWrapper>
          <Dotted></Dotted>
          <Dotted></Dotted>
          <Dotted></Dotted>
        </DottedWrapper>
      );
    }
  };

  return <Wrapper>{switchRender()}</Wrapper>;
};

const Wrapper = styled.div`
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
  margin-top: 20px;
`;

const Spinner = styled.div`
  background: lightskyblue;
  border-radius: 50%;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: light;
`;

const spinner = keyframes`
   from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${(props) =>
    true &&
    css`
      animation: ${spinner} infinite 2s linear;
    `};
`;

const DottedWrapper = styled.div`
  display: flex;
`;

const Dotted = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: black;

  &:nth-child(1) {
    ${(props) =>
      true &&
      css`
        animation: ${dotted1} infinite 2s linear;
      `};
  }
  &:nth-child(2) {
    margin-left: 20px;
    margin-right: 20px;

    ${(props) =>
      true &&
      css`
        animation: ${dotted2} infinite 2s linear;
      `};
  }
  &:nth-child(3) {
    ${(props) =>
      true &&
      css`
        animation: ${dotted3} infinite 2s linear;
      `};
  }
`;

const dotted1 = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const dotted2 = keyframes`
  0%, 40% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const dotted3 = keyframes`
  0%, 65% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export default Loading;
