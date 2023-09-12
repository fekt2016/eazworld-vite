import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
  HiOutlineCog8Tooth,
  HiOutlineDocumentChartBar,
} from 'react-icons/hi2'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-black-100);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    text-transform: capitalize;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`
const StyledP = styled.p`
  color: var(--color-grey-0);
  font-size: 1.2rem;
  text-align: center;
  text-transform: capitalize;
`
function MainNav() {
  return (
    <StyledNav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/buy">
            <HiOutlineCurrencyDollar />
            <span>buy</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/sell">
            <HiOutlineCurrencyEuro />
            <span>sell</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/history">
            <HiOutlineDocumentChartBar />
            <span>history</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/">
            <HiOutlineDocumentChartBar />
            <span>prepaid</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog8Tooth />
            <span>settings</span>
          </StyledNavLink>
        </li>
      </NavList>
      <StyledP>copyright eazworld </StyledP>
    </StyledNav>
  )
}

export default MainNav
