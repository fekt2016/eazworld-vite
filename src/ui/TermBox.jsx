import styled from "styled-components";
import { devicesMax } from "../styles/breakpoint";

const TermBox = styled.div`
  margin-top: 2rem;
  width: 100%;
  text-align: center;
  padding: 1rem;
  align-self: start;
  box-shadow: var(--shadow-sm);
  // background-color: var(--color-primary-300);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: start;
  justify-content: start;

  @media ${devicesMax.md} {
    width: 100%;
  }
`;

export default TermBox;
