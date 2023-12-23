/* eslint react/prop-types: 0 */
import styled, { css } from 'styled-components'

const StyledLogo = styled.div`
  display: flex;
  height: inherit;
  align-items: center;
  /* margin-bottom: 6rem; */
`

const Img = styled.img`
  margin: 0 auto;
  ${(props) =>
    props.type === 'big' &&
    css`
      height: 1rem;
    `}
  ${(props) =>
    props.type === 'small' &&
    css`
      height: 3rem;
    `}
<<<<<<< HEAD
=======

  ${(props) => props.type === 'login' && css``}
`

const Img = styled.img`


    ${(props) =>
      props.sizes === 'small' &&
      css`
        height: 10rem;
      `}
    ${(props) =>
      props.sizes === 'big' &&
      css`
        height: 20rem;
      `}
    ${(props) =>
      props.sizes === 'medium' &&
      css`
        height: 15rem;
      `}

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
`

function Logo({ type, img }) {
  return (
    <StyledLogo>
      <Img src={img} alt="Logo" type={type} />
    </StyledLogo>
  )
}

export default Logo
