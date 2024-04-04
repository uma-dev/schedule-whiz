import styled from "styled-components";

const GradientDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(239, 248, 255);
  background: linear-gradient(
    281deg,
    rgba(239, 248, 255, 1) 0%,
    rgba(255, 245, 245, 1) 43%,
    rgba(255, 251, 237, 1) 100%
  );
  ${(props) =>
    props.color === "dark" &&
    `
    background: linear-gradient(to right, #303a3F, #1a1c20);
  `}
`;

export default GradientDiv;
