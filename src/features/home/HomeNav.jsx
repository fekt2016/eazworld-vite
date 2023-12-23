import { styled, css } from 'styled-components'

import Logo from '../../ui/Logo'
import { NavLink } from 'react-router-dom'
import { devicesMax, devicesMin } from '../../styles/breakpoint'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import { useState } from 'react'

const sideNav = css`
  height: 50%;
  flex-direction: column;
  justify-content: space-evenly;
  color: white;
`

const StyledNav = styled.nav`
  padding: 1rem 5rem;
  border-bottom: 1px solid var(--color-grey-100);

  height: 7rem;
<<<<<<< HEAD

=======
  z-index: 999;
  background-color: var(--color-white-0);
>>>>>>> parent of 4c94207 (email setting)
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLeftContainer = styled.div`
  height: 100%;
<<<<<<< HEAD
=======
  display: flex;
  justify-content: center;
  align-items: center;
>>>>>>> parent of 4c94207 (email setting)
`
const StyledRightContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;
`
const StyledSideNav = styled.div`
  height: 100vh;
  width: 30rem;
  padding: 1rem;
  background-color: var(--color-black-950);
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 10;

  @media ${devicesMin.sm} {
    display: none;
  }
`
const StyledUl = styled.ul`
  text-transform: capitalize;

  flex-basis: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${(props) => (props.isOpen ? sideNav : '')}
`
const StyledLi = styled(NavLink)`
  border-bottom: 1px solid transparent;
  padding: 0.5rem;
  transition: all 0.3s;
  position: relative;
  &::before {
    content: '';
    height: 1px;
    background-color: black;
    width: 0;
    position: absolute;
    bottom: 1px;
    transition: all 0.3s;
  }
  &:hover::before {
    background-color: var(--color-black-950);
    width: 100%;
  }
`

const StyledList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-basis: 70%;

  @media ${devicesMax.sm} {
    display: none;
  }
`
const StyledBtnD = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-basis: 20rem;

  @media ${devicesMax.sm} {
    flex-basis: 15rem;
  }
`
const StyledBtn = styled(NavLink)`
  border: 1px solid var(--color-black-950);
  border-radius: var(--Border-radius-cir);
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: var(--color-black-950);
    color: var(--color-white-0);
  }

  @media ${devicesMax.sm} {
    padding: 0.5rem 1rem;
  }
`
const NavButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-900);
  }

  @media ${devicesMax.sm} {
    display: block;
  }
`

function HomeNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledNav>
      {isOpen && (
        <StyledSideNav>
          <StyledUl isOpen={isOpen}>
            <StyledLi>
              <NavLink to="/home">home</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/buy">buy</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/sell">sell</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/blog">blog</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/contact">contact</NavLink>
            </StyledLi>
          </StyledUl>
        </StyledSideNav>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 4c94207 (email setting)
      <StyledLeftContainer>
        <NavButton onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </NavButton>
        <Logo img="/logo67.png" type="small" />
      </StyledLeftContainer>
<<<<<<< HEAD
=======

      <NavButton onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
      </NavButton>
      {/* <Logo img="../../../eaz1 50x50.png" sizes="small" type="nav" /> */}
      <Img src="/eaz1.png" alt="logo" />

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 5f192ef (email setting)
=======
>>>>>>> parent of 4c94207 (email setting)
      <StyledRightContainer>
        <StyledList>
          <StyledUl>
            <StyledLi>
              <NavLink to="/home">home</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/buy">buy</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/sell">sell</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/blog">blog</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="/contact">contact</NavLink>
            </StyledLi>
          </StyledUl>
        </StyledList>
        <StyledBtnD>
          <StyledBtn to="/login">Login</StyledBtn>

          <StyledBtn to="/signup">Register</StyledBtn>
        </StyledBtnD>
      </StyledRightContainer>
    </StyledNav>
  )
}

export default HomeNav
