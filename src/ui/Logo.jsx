/* eslint react/prop-types: 0 */
import styled, { css } from 'styled-components'

const StyledLogo = styled.div`
  display: flex;
  height: inherit;
  align-items: center;
`

const Img = styled.img`
  ${(props) =>
    props.type === 'big' &&
    css`
      height: 3rem;
    `}
  ${(props) =>
    props.type === 'small' &&
    css`
      height: 2rem;
    `}
`

function Logo({ type, img }) {
  return (
    <StyledLogo>
      <Img src={img} alt="Logo" type={type} />
    </StyledLogo>
  )
}

export default Logo
