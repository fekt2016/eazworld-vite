import styled, { css } from "styled-components";
import { devicesMax } from "../styles/breakpoint";

const Heading = styled.h1`
  ${(props) =>
    props.as === "homeh1" &&
    css`
    color: var(--color-gold-900);
      font-size: 9rem;
      font-weight: 900;
      line-height: 1.2;
      font-stretch: extra-condensed;
      text-transform: capitalize;
      text-align: center;
      font-family: font-family: "Montserrat", sans-serif;
      text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);

      @media ${devicesMax.md} {
        font-size: 4rem;
      }
    `}
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2rem;
      line-height: 1.2;
      font-stretch: extra-condensed;
      text-transform: capitalize;
      text-align: center;
      font-family: "Lato", sans-serif;

      @media ${devicesMax.md} {
        font-size: 2.5rem;
      }
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 5rem;
      font-weight: 600;
      @media ${devicesMax.md} {
        font-size: 2.5rem;
      }
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      text-transform: capitalize;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      color: var(--color-sec-500);
      font-size: 2rem;
      font-weight: 500;
      text-transform: capitalize;
      text-align: center;
    `}
`;
export default Heading;
