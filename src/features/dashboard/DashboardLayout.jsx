import { Outlet } from 'react-router-dom'
import Sidebar from '../../ui/Sidebar'
import DashHeader from './DashHeader'
import { styled } from 'styled-components'

import { devicesMax } from '../../styles/breakpoint'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media ${devicesMax.md} {
    grid-template-columns: 1fr;
  }
`
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  @media ${devicesMax.md} {
    padding: 3rem 3.8rem 5.4rem;
  }
`

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Sidebar />
      <DashHeader />
      <Main>
        <Outlet />
      </Main>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
