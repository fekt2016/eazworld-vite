import { Outlet } from 'react-router-dom'
import HomeNav from './HomeNav'
function Nav() {
  return (
    <>
      <HomeNav />
      <Outlet />
    </>
  )
}

export default Nav
