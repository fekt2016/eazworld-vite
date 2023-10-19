import { styled, css } from 'styled-components'
import Logo from '../ui/Logo'
import MainNav from './MainNav'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useState } from 'react'

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  width: 25rem;
  height: 100%;
  background-color: var(--color-black-950);
  display: flex;
  transition: width 0.2s ease-in;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.type === 'inactive' &&
    css`
      width: 80px;
      padding: 2rem;
    `}
`
const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Sidebar() {
  const [inactive, setInactive] = useState(false)

  return (
    <StyledSidebar type={inactive ? 'inactive' : ''}>
      <SectionTop>
        <Logo type="small" img="/logo100.png" />
        <ButtonIcon type="navIcon" onClick={() => setInactive(!inactive)}>
          {inactive ? (
            <HiOutlineArrowRight style={{ color: 'white', fontSize: '16px' }} />
          ) : (
            <HiOutlineArrowLeft style={{ color: 'white', fontSize: '16px' }} />
          )}
        </ButtonIcon>
      </SectionTop>
      <MainNav inactive={inactive} />
    </StyledSidebar>
  )
}

export default Sidebar
