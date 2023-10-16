import { Outlet } from 'react-router-dom'
import Sidebar from '../../ui/Sidebar'
import DashHeader from './DashHeader'
import { styled } from 'styled-components'

import { devicesMax } from '../../styles/breakpoint'
import { useState } from 'react'

const StyledDashboardLayout = styled.div`
  display: flex;
  height: 100vh;

  @media ${devicesMax.md} {
    grid-template-columns: 10rem 1fr;
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
const StyledContainer = styled.div`
  flex: 1;
`

function DashboardLayout() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <StyledDashboardLayout>
      <Sidebar sidebar={sidebar} />
      <StyledContainer>
        <DashHeader sidebar={sidebar} showSidebar={showSidebar} />
        <Main>
          <Outlet />
        </Main>
      </StyledContainer>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
