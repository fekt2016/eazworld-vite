import { Outlet, useNavigate } from 'react-router-dom'
import supabase from '../services/supabase'
import { useEffect, useState } from 'react'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import styled from 'styled-components'
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 49283c7 (final)
// import ManageOrderBuy from '../features/admin/ManageOrderBuy'
// import ManageOrderSell from '../features/admin/ManageOrderSell'
// import Customers from '../features/admin/Customers'
// import RateUpdate from '../features/admin/RateUpdate'
import Stats from '../ui/Stats'
// import Stat from '../ui/Stat'
// import { HiOutlineBriefcase } from 'react-icons/hi2'
<<<<<<< HEAD
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 49283c7 (final)
// import AdminHeader from '../features/admin/AdminHeader'

const StyledAdmin = styled.div`
  background-color: var(--color-grey-200);
`
const StyledBox = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  padding: 1rem;
`
// const Box = styled.div`
// cursor: pointer;
// background-color: var(--color-white-0);
//   ${(props) => props.type === 'buy' && css``}
//   ${(props) => props.type === 'sell' && css``}
//   ${(props) => props.type === 'user' && css``}
//   ${(props) => props.type === 'rate' && css``}
// `
function Admin() {
  const [user, setUser] = useState('')
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // const [toggle, setToggle] = useState(1)
>>>>>>> parent of 49283c7 (final)
=======
  // const [toggle, setToggle] = useState(1)
>>>>>>> parent of 49283c7 (final)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession()

      if (!session.session) return navigate('/login')

      const { data: user } = await supabase.from('users').select('*').single()
      setUser(user)
<<<<<<< HEAD
<<<<<<< HEAD
=======

      if (user.role === 'user') return navigate('/dashboard')
>>>>>>> parent of 49283c7 (final)
=======

      if (user.role === 'user') return navigate('/dashboard')
>>>>>>> parent of 49283c7 (final)
    }

    getUser()
  }, [navigate, user])

<<<<<<< HEAD
<<<<<<< HEAD
  if (user?.role !== 'admin') {
    return navigate('/dashboard')
  }

=======
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 49283c7 (final)
  return (
    <StyledAdmin>
      <Row>
        <Heading as="h1">admin dashboard</Heading>
      </Row>
<<<<<<< HEAD
<<<<<<< HEAD
      <div>
        <Outlet />
      </div>
=======
=======
>>>>>>> parent of 49283c7 (final)
      <StyledBox>
        <Stats />
      </StyledBox>

      <Outlet />
<<<<<<< HEAD
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 49283c7 (final)
    </StyledAdmin>
  )
}

export default Admin
