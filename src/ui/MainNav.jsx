import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
  HiOutlineCog8Tooth,
  HiOutlineDocumentChartBar,
  HiOutlineCreditCard,
} from 'react-icons/hi2'

const StyledNav = styled.nav`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10rem;
`
const NavList = styled.ul`
  /* gap: 0.8rem; */
  /* padding: 1rem; */
`

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;

    color: var(--color-black-100);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 0.4rem;
    transition: all 0.2s;
    text-transform: capitalize;
  }

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
    color: var(--color-black-900);
  }
`
const StyledP = styled.p`
  color: var(--color-grey-0);
  font-size: 1.2rem;
  text-align: center;
  text-transform: capitalize;
`
const StyledSpan = styled.span`
  transition: all 0.2s;
`
const StyledLi = styled.li`
  margin-bottom: 1rem;
`

function MainNav({ inactive }) {
  return (
    <StyledNav>
      <NavList>
        <StyledLi>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            {inactive ? '' : <StyledSpan>dashboard</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/buy">
            <HiOutlineCurrencyDollar />
            {inactive ? '' : <StyledSpan>buy</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/sell">
            <HiOutlineCurrencyEuro />
            {inactive ? '' : <StyledSpan>sell</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/history">
            <HiOutlineDocumentChartBar />
            {inactive ? '' : <StyledSpan>history</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/prepaid">
            <HiOutlineCreditCard />
            {inactive ? '' : <StyledSpan>prepaid</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/settings">
            <HiOutlineCog8Tooth />
            {inactive ? '' : <StyledSpan>settings</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
      </NavList>
      <StyledP>copyright eazworld </StyledP>
    </StyledNav>
  )
}

export default MainNav
