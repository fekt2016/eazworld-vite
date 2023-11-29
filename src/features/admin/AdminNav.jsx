import styled from 'styled-components'

import { BsBorderStyle } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa6'
import { BsCurrencyExchange } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
  width: 100%;
  margin-top: 2rem;
`
const List = styled.ul`
  width: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`
const ListItem = styled.li`
  /* padding: 2rem; */
  text-transform: capitalize;
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

function AdminNav({ sidebar }) {
  return (
    <Nav>
      <List>
        <ListItem>
          <StyledNavLink
            to="admin/manage-order"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <BsBorderStyle />
            {sidebar && <StyledSpan>manage Orders</StyledSpan>}
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink
            to="admin/customers"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <FaUsers /> {sidebar && <StyledSpan>Customers</StyledSpan>}
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink
            to="admin/rate-update"
            style={
              !sidebar
                ? { justifyContent: 'center' }
                : { justifyContent: 'flex-start' }
            }
          >
            <BsCurrencyExchange />
            {sidebar && <StyledSpan>Rate Update</StyledSpan>}
          </StyledNavLink>
        </ListItem>
      </List>
    </Nav>
  )
}

export default AdminNav
