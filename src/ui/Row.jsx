import styled, { css } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const Row = styled.div`
  display: flex;


  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;

      @media ${devicesMax.md} {
        flex-direction: column;
      }
    `}
  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
    ${(props) =>
      props.type === 'horizontal' &&
      props.basis === 'basis' &&
      css`
        justify-context: space-between;
        align-items: center;
        flex-basis: 60%;

        display: flex;
        justify-content: flex-end;
        gap: 2rem;
      `}
`
Row.defaultProps = {
  type: 'vertical',
}
export default Row
