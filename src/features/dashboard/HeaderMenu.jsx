import styled from 'styled-components'
import Logout from '../authentication/Logout'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`
const StyledLi = styled.li`
  margin: 1rem;
`

function HeaderMenu() {
  const Navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <StyledLi>
        <ButtonIcon onClick={() => Navigate('/settings')}>
          <HiOutlineUser />
        </ButtonIcon>
      </StyledLi>
      <StyledLi>
        <Logout />
      </StyledLi>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
