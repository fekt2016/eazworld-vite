import styled, { css } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const Form = styled.form`
  overflow: hidden;
  font-size: 1.4rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  margin: 0 auto;

  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media ${devicesMax.md} {
        padding: 2.4rem 1rem;
      }
    `}
`
Form.defaultProps = {
  type: 'regular',
}
export default Form
