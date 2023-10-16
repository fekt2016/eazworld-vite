import { styled } from 'styled-components'
import HeaderMenu from './HeaderMenu'
import UserAvatar from '../authentication/UserAvatar'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2'
import { devicesMax } from '../../styles/breakpoint'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  height: 7rem;
  /* padding: 0 0 2rem 4rem; */

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  @media ${devicesMax.md} {
    justify-content: space-between;
  }
`
const StyledLeft = styled.div`
  display: none;
  transition: all 0.3s;

  @media ${devicesMax.md} {
    display: block;
  }
`
const StyledRight = styled.div`
  display: flex;
`
function DashHeader({ sidebar, showSidebar }) {
  return (
    <StyledHeader>
      <StyledLeft>
        <ButtonIcon onClick={showSidebar}>
          {sidebar ? <HiOutlineXMark /> : <HiBars3 />}
        </ButtonIcon>
      </StyledLeft>
      <StyledRight>
        <UserAvatar />
        <HeaderMenu />
      </StyledRight>
    </StyledHeader>
  )
}

export default DashHeader
