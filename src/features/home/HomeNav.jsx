import { css, styled } from "styled-components";

// import Logo from '../../ui/Logo'
import { NavLink } from "react-router-dom";
import { devicesMax, devicesMin } from "../../styles/breakpoint";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";

const sideNav = css`
  height: 50%;
  flex-direction: column;
  justify-content: space-evenly;
  color: var(--color-white-0);
`;

const StyledNav = styled.nav`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  position: sticky;
  top: 0;
  height: 7rem;
  /* z-index: 999; */
  background-color: var(--color-white-0);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRightContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;
  padding: 0 4rem;
`;
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
`;
const StyledUl = styled.ul`
  text-transform: capitalize;

  flex-basis: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${(props) => (props.isOpen ? sideNav : "")}
`;
const StyledLi = styled(NavLink)`
  border-bottom: 1px solid transparent;
  padding: 0.5rem;
  transition: all 0.3s;
  position: relative;
  &::before {
    content: "";
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
`;

const StyledList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-basis: 70%;

  @media ${devicesMax.sm} {
    display: none;
  }
`;
const StyledBtnD = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-basis: 20rem;

  @media ${devicesMax.sm} {
    flex-basis: 16rem;
  }
`;
const StyledBtn = styled(NavLink)`
  ${(props) =>
    props.btn === "login" &&
    css`
      background-color: var(--color-gold-900);
      padding: 0.5rem 2rem;
      border-radius: var(--Border-radius-cir);
      transition: all 0.4s;
      &:hover {
        transform: scale(1.2);
      }
    `}
  ${(props) =>
    props.btn === "register" &&
    css`
      border-radius: var(--Border-radius-cir);
      border: 1px solid var(--color-gold-900);
      padding: 0.5rem 1.5rem;
      transition: all 0.4s;
      &:hover {
        background-color: var(--color-gold-900);
      }
    `}

  @media ${devicesMax.sm} {
    padding: 0.5rem 1rem;
  }
`;
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
  z-index: 2000
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
`;

const Img = styled.img`
  height: 8rem;
  position: absolute;
  top: -5px;
  left: 40px;
`;

function HomeNav() {
  const [isOpen, setIsOpen] = useState(false);

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
              <NavLink to="home/blog">blog</NavLink>
            </StyledLi>
            <StyledLi>
              <NavLink to="home/contact">contact</NavLink>
            </StyledLi>
          </StyledUl>
        </StyledSideNav>
      )}

      <NavButton onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
      </NavButton>

      <Img src="/4.png" alt="logo" />

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
          <StyledBtn btn="login" to="/login">
            Login
          </StyledBtn>

          <StyledBtn btn="register" to="/signup">
            Register
          </StyledBtn>
        </StyledBtnD>
      </StyledRightContainer>
    </StyledNav>
  );
}

export default HomeNav;
