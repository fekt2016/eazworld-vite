import { Outlet } from 'react-router-dom'
import Sidebar from '../../ui/Sidebar'
import DashHeader from './DashHeader'
import { styled } from 'styled-components'
import { useState } from 'react'
import { devicesMax } from '../../styles/breakpoint'

const StyledDashboardLayout = styled.div`
  height: 100vh;
  display: flex;
`
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  background-color: aliceblues;
  height: 100%;
  width: 100%;
  @media ${devicesMax.md} {
    padding: 2rem 2rem;
  }
`
const ConRight = styled.div`
  flex: 1;
  height: 100vh;
  background-color: var(--color-grey-50);
  overflow: scroll;
`
const ConLeft = styled.div`
  //
`

function DashboardLayout() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <StyledDashboardLayout>
      <ConLeft>
        <Sidebar />
      </ConLeft>
      <ConRight>
        <DashHeader sidebar={sidebar} showSidebar={showSidebar} />
        <Main>
          <Outlet />
        </Main>
      </ConRight>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
