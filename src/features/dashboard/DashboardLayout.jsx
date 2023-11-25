import { Outlet } from 'react-router-dom'
import Sidebar from '../../ui/Sidebar'
import DashHeader from './DashHeader'
import { styled } from 'styled-components'
import { useState } from 'react'
import { devicesMax } from '../../styles/breakpoint'

const StyledDashboardLayout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Main = styled.main`
  padding: 8rem;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  background-color: var(--color-grey-50);
  width: 100%;

  @media ${devicesMax.md} {
    padding: 4rem 2rem 2rem 9rem;
    align-items: center;
  }
`

const StyledP = styled.p`
  color: var(--color-grey-0);
  font-size: 1.2rem;
  text-align: center;
  text-transform: capitalize;
`

function DashboardLayout() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar((s) => !s)

  return (
    <StyledDashboardLayout>
      <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
      <DashHeader
        sidebar={sidebar}
        setSidebar={setSidebar}
        showSidebar={showSidebar}
      />
      <Main>
        <Outlet />
      </Main>
      <StyledP> &#169;2000 copyright eazworld All rights reserved</StyledP>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
