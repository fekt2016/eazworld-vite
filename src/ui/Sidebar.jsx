import { styled, css } from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'
import { devicesMax } from '../styles/breakpoint'

const StyledSidebar = styled.aside`
  background-color: var(--color-black-950);
  padding: 3.2rem 2.4rem;
  border-right: 1 px solid var(--color-grey-100);
  width: 26rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  transition: all 0.3s;

  @media ${devicesMax.md} {
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
  ${(props) =>
    props.show &&
    css`
      width: 26rem;
      opacity: 1;
      visibility: visible;
    `}
`

function Sidebar({ sidebar }) {
  return (
    <StyledSidebar type={sidebar ? 'show' : ''}>
      <Logo type="small" img="/logo100.png" />
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar
