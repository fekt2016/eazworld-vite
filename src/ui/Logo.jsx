/* eslint react/prop-types: 0 */
import styled, { css } from 'styled-components'
<<<<<<< HEAD

const StyledLogo = styled.div`
  display: flex;
  height: inherit;
  align-items: center;
  /* margin-bottom: 6rem; */
=======
import { devicesMax } from '../styles/breakpoint'
import { Link } from 'react-router-dom'

const StyledLogo = styled.div`
  /* display: flex;
  height: inherit;
  align-items: center; */
>>>>>>> parent of 4c94207 (email setting)
`

const Img = styled.img`
  margin: 0 auto;
<<<<<<< HEAD
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
=======
  ${(props) =>
    props.type === 'big' &&
    css`
      height: 1rem;
    `}
  ${(props) =>
    props.type === 'small' &&
    css`
      height: 3rem;

      @media ${devicesMax.md} {
        height: 2rem;
        margin-left: 1rem;
      }
    `}
>>>>>>> parent of 4c94207 (email setting)
`

function Logo({ type, img }) {
  return (
    <StyledLogo>
<<<<<<< HEAD
      <Img src={img} alt="Logo" type={type} />
=======
      <Link to="/">
        <Img src={img} alt="Logo" type={type} />
      </Link>
>>>>>>> parent of 4c94207 (email setting)
    </StyledLogo>
  )
}

export default Logo
