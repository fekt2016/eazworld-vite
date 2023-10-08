import { styled } from 'styled-components'
import HeaderMenu from './HeaderMenu'
import UserAvatar from '../authentication/UserAvatar'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
  padding: 0 4rem;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`
function DashHeader() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}

export default DashHeader
