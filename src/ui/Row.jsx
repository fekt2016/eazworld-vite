import styled, { css } from 'styled-components'

const Row = styled.div`
  display: flex;


  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
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
