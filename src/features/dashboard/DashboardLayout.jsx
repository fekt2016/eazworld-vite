import { Outlet } from 'react-router-dom'
import Sidebar from '../../ui/Sidebar'
import DashHeader from './DashHeader'
import { styled } from 'styled-components'
import { useState } from 'react'

const StyledDashboardLayout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Main = styled.main`
<<<<<<< HEAD
  padding: 8rem 2rem 20rem 8rem;

=======
  /* padding: 8rem 2rem 20rem 8rem; */
  padding-left: 8rem;
  padding-right: 8rem;
>>>>>>> parent of 4c94207 (email setting)
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-50);
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
