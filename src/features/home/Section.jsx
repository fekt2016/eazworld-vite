import styled, { css } from "styled-components";
import { devicesMax } from "../../styles/breakpoint";

const StyledSection = styled.section`
  ${(props) =>
    props.type === "service" &&
    css`
      padding: 20rem 6rem;

      background-color: var(--color-grey-100);
      opacity: 90%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;

      @media ${devicesMax.md} {
        padding: 4rem;

        display: flex;
        flex-direction: column;
      }
    `}
  ${(props) =>
    props.type === "safe" &&
    css`
      background-color: black;
      text-align: center;
      color: var(--color-white-0);
      font-size: 3rem;
      padding: 8rem;

      @media ${devicesMax.md} {
        font-size: 1.6rem;
        padding: 8rem 2rem;
      }
    `}

    ${(props) =>
    props.type === "step" &&
    css`
      padding: 3rem;
      @media ${devicesMax.md} {
      }
    `}
      ${(props) =>
    props.type === "slider" &&
    css`
      background-color: black;
      padding: 4rem;
    `}
`;

export default StyledSection;
