import { useNavigate } from 'react-router-dom'
import supabase from '../services/supabase'
import { useEffect, useState } from 'react'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import styled from 'styled-components'
import AdminHeader from '../features/admin/adminHeader'

const StyledAdmin = styled.div`
  background-color: var(--color-grey-200);
`

function Admin() {
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

  if (user?.role !== 'admin') {
    return navigate('/dashboard')
  }

  return (
    <StyledAdmin>
      <Row>
        <Heading as="h1">admin dashboard</Heading>
      </Row>
      <AdminHeader />
    </StyledAdmin>
  )
}

export default Admin
