import { useEffect, useState } from 'react'
import Heading from '../ui/Heading'
import PriceCard from '../ui/PriceCard'
import Row from '../ui/Row'
import supabase from '../services/supabase'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  background-color: black;
  text-transform: capitalize;
  color: var(--color-white-0);
  padding: 1rem;
`
// const Empty = styled.div`
//   height: 50rem;
//   width: 100%;
//   background-color: var(--color-white-0);
// `
function Dashboard() {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession()

      if (!session.session) return navigate('/login')

      const { data: user } = await supabase.from('users').select('*').single()
      setUser(user)
    }

    getUser()
  }, [navigate, user])
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Dashbaord</Heading>
        {user?.role === 'admin' && (
          <StyledLink to="/admin">admin dashboard</StyledLink>
        )}
      </Row>
      <Row>
        <PriceCard />
        {/* <Empty></Empty> */}
      </Row>
    </>
  )
}

export default Dashboard
