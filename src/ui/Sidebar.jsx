import { styled } from 'styled-components'
import Logo from '../ui/Logo'
import MainNav from './MainNav'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'

const StyledSidebar = styled.aside`
  padding: 3.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  height: 100vh;
  background-color: var(--color-black-950);
  transition: width 0.2s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  z-index: 999;
`
const SectionTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Sidebar({ sidebar, showSidebar }) {
  return (
    <StyledSidebar style={!sidebar ? { width: '60px' } : { width: ' 24rem' }}>
      <ButtonIcon
        type="navIcon"
        onClick={showSidebar}
        style={!sidebar ? { left: '62px' } : { left: '220px' }}
      >
        {sidebar ? (
          <HiChevronLeft style={{ color: 'white' }} />
        ) : (
          <HiChevronRight style={{ color: 'white' }} />
        )}
      </ButtonIcon>
      <SectionTop>
        <Logo type="small" img="/logo100.png" />
      </SectionTop>
      <MainNav sidebar={sidebar} />
    </StyledSidebar>
  )
}

export default Sidebar
