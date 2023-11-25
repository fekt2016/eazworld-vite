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
  padding: 4rem 4.8rem 6.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-50);

  @media ${devicesMax.md} {
    margin-right: 1rem;
  }
`
const ConRight = styled.div`
  padding: 2rem;
  flex: 1;

  margin-left: 80px;

  transition: all 0.3s ease-in;
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
  console.log(sidebar)
  return (
    <StyledDashboardLayout>
      <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
      <ConRight>
        <DashHeader
          sidebar={sidebar}
          setSidebar={setSidebar}
          showSidebar={showSidebar}
        />
        <Main>
          <Outlet />
        </Main>
      </ConRight>
      <StyledP> &#169;2000 copyright eazworld All rights reserved</StyledP>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
