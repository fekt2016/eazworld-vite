import styled, { css } from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const Row = styled.div`
  display: flex;
  padding: 1rem;



${(props) =>
  props.type === 'contact' &&
  css`
    justify-content: flex-start;
    align-items: center;

    @media ${devicesMax.md} {
      flex-direction: column;
    }
  `}
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
  props.type === 'buy' &&
  css`
    background-image: linear-gradient(to bottom right, #6366f1, #83c9ff);
    justify-content: space-between;
    padding: 1rem;
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
