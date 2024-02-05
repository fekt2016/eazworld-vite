import { Outlet } from 'react-router-dom'
import Sidebar from '../ui/Sidebar'
import DashHeader from '../features/dashboard/DashHeader'
import { styled } from 'styled-components'
import { useState } from 'react'
import { devicesMax } from '../styles/breakpoint'

const StyledDashboardLayout = styled.div`
  display: flex;

  flex-direction: column;
  align-items: stretch;
  position: relative;
  background-color: var(--color-grey-100);
`

const Main = styled.main`
  padding: 0rem 2rem 0rem 8rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-00);

  @media ${devicesMax.md} {
    padding-right: 1rem;
    padding-left: 7rem;
  }
  @media ${devicesMax.md} {
    padding-right: 0.5rem;
    padding-left: 6rem;
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
        <StyledP> &#169;2000 copyright eazworld All rights reserved</StyledP>
      </Main>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
