import { styled } from 'styled-components'
import HeaderMenu from './HeaderMenu'
import UserAvatar from '../authentication/UserAvatar'

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4rem;
  position: sticky;
`

const StyledRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

function DashHeader() {
  return (
    <>
      <StyledHeader>
        <StyledRight>
          <UserAvatar />
          <HeaderMenu />
        </StyledRight>
      </StyledHeader>
    </>
  )
}

export default DashHeader
