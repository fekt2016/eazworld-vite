import { useEffect, useState } from 'react'
import Heading from '../ui/Heading'
import PriceCard from '../ui/Price'
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

function Dashboard() {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession()

      if (!session.session) return navigate('/login')

      const { session: data } = session
      const { user: curUser } = data

      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', curUser.id)

      setUser(user[0])
    }

    getUser()
  }, [navigate])
  console.log(user)
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
      </Row>
    </>
  )
}

export default Dashboard
