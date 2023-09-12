import { styled } from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

import { devicesMax } from '../styles/breakpoint'

const StyledSidebar = styled.aside`
  background-color: var(--color-black-950);
  padding: 3.2rem 2.4rem;
  border-right: 1 px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media ${devicesMax.md} {
    display: none;
  }
`

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo type="small" img="/logo100.png" />
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar
