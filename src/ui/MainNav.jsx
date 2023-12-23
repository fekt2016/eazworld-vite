import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import {
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineCurrencyEuro,
  HiOutlineCog8Tooth,
  HiOutlineDocumentChartBar,
  HiOutlineCreditCard,
  HiArrowRightOnRectangle,
} from 'react-icons/hi2'
import { useLogout } from '../features/authentication/useLogout'
import SpinnerMini from './SpinnerMini'

const StyledNav = styled.nav`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10rem;
`
const NavList = styled.ul`
  width: 100%;
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

const StyledSpan = styled.span`
  transition: all 0.2s;
`
const StyledLi = styled.li`
  margin-bottom: 1rem;
`

function MainNav({ sidebar }) {
  const { logout, isLoading } = useLogout()
  return (
    <StyledNav>
      <NavList>
        <StyledLi>
          <StyledNavLink
            to="/dashboard"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineHome />
            {sidebar && <StyledSpan>dashboard</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink
            to="/buy"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineCurrencyDollar />
            {sidebar && <StyledSpan>buy</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink
            to="/sell"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineCurrencyEuro />
            {sidebar && <StyledSpan>sell</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink
            to="/history"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineDocumentChartBar />
            {sidebar && <StyledSpan>history</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink
            to="/prepaid"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineCreditCard />
            {sidebar && <StyledSpan>prepaid</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink
            to="/settings"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <HiOutlineCog8Tooth />
            {sidebar && <StyledSpan>settings</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
        <StyledLi onClick={logout} disabled={isLoading}>
          <StyledNavLink
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
            {sidebar && <StyledSpan>logout</StyledSpan>}
          </StyledNavLink>
        </StyledLi>
      </NavList>
    </StyledNav>
  )
}

export default MainNav
