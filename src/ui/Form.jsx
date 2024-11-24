import styled, { css } from "styled-components";
import { devicesMax } from "../styles/breakpoint";

const Form = styled.form`
  overflow: hidden;
  font-size: 1.4rem;
  margin: 0 auto;
  background-color: var(--color-grey-0);
  border: 2px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 3rem;
      width: 70%;
      @media ${devicesMax.md} {
        padding: 2.4rem 1rem;
      }
    `}
  ${(props) =>
    props.type === "login" &&
    css`
      padding: 2.4rem;
      width: 100%;

      @media ${devicesMax.md} {
        padding: 2.4rem 1rem;
      }
    `}

  ${(props) =>
    props.type === "signup" &&
    css`
      width: 80%;
      padding: 1rem;
      margin-top: 2rem;
    `}
  ${(props) =>
    props.type === "buy" &&
    css`
        padding: 4rem;
        box-shadow: var(--shadow-md);
        background-color: var(--color-white-0);
        padding: 2.4rem 1.2rem;
        width: 60%; 
        @media ${devicesMax.md} {
        width: 100%;
      }
        }
      `}
  ${(props) =>
    props.type === "test" &&
    css`
      width: 100%;
      background-color: var(--color-white-0);
      padding: 2rem;
    `}
`;
Form.defaultProps = {
  type: "regular",
};
export default Form;
