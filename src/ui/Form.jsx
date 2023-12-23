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
      /* Box */

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
      width: 50%;
      /* Box */
      box-shadow: var(--shadow-lg);
<<<<<<< HEAD

=======
>>>>>>> parent of 4c94207 (email setting)
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
