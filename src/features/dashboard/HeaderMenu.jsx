import styled from 'styled-components'
import Logout from '../authentication/Logout'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  const Navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => Navigate('/settings')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
