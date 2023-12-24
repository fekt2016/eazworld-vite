import styled, { css } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const Form = styled.form`
  overflow: hidden;
  font-size: 1.4rem;
  margin: 0 auto;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      width: 70%;
      @media ${devicesMax.md} {
        padding: 2.4rem 1rem;
      }
    `}
    ${(props) =>
      props.type === 'login' &&
      css`
        padding: 2.4rem 4rem;
        width: 100%;

        @media ${devicesMax.md} {
          padding: 2.4rem 1rem;
        }
      `}

  ${(props) =>
    props.type === 'signup' &&
    css`
      width: 100%;

      padding: 2rem;
      /* Box */

      @media ${devicesMax.md} {
        /* padding: 6rem; */
      }
    `}
    ${(props) =>
      props.type === 'buy' &&
      css`
        flex: 2;
        padding: 2rem;
        /* Box */
        box-shadow: var(--shadow-lg);

        @media ${devicesMax.md} {
          padding: 2.4rem 1rem;
          width: 100%;
        }
      `}

`
Form.defaultProps = {
  type: 'regular',
}
export default Form
