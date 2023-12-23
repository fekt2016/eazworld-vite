import { styled } from 'styled-components'
import Logo from '../ui/Logo'
import MainNav from './MainNav'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../services/supabase'
import AdminNav from '../features/admin/AdminNav'

const StyledSidebar = styled.aside`
  padding: 3.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  height: 100vh;
  background-color: var(--color-black-950);
  transition: width 0.2s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  z-index: 999;
`
const SectionTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Sidebar({ sidebar, showSidebar }) {
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

  if (user?.role === 'admin') {
    return (
      <StyledSidebar style={!sidebar ? { width: '60px' } : { width: ' 24rem' }}>
        <ButtonIcon
          type="navIcon"
          onClick={showSidebar}
          style={!sidebar ? { left: '62px' } : { left: '220px' }}
        >
          {sidebar ? (
            <HiChevronLeft style={{ color: 'white' }} />
          ) : (
            <HiChevronRight style={{ color: 'white' }} />
          )}
        </ButtonIcon>
        <SectionTop>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Logo type="small" img="/logo100.png" />
=======
          <Logo type="small" img="/eazwhite1.png" />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo type="small" img="/4.png" />
>>>>>>> parent of 49283c7 (final)
=======
          <Logo type="small" img="/4.png" />
>>>>>>> parent of 49283c7 (final)
=======
          <Logo type="small" img="/eazwhite1.png" />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo type="small" img="/eazwhite1.png" />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo type="small" img="/logo100.png" />
>>>>>>> parent of 4c94207 (email setting)
        </SectionTop>
        <AdminNav sidebar={sidebar} />
      </StyledSidebar>
    )
  }

  if (user?.role === 'user') {
    return (
      <StyledSidebar style={!sidebar ? { width: '60px' } : { width: ' 24rem' }}>
        <ButtonIcon
          type="navIcon"
          onClick={showSidebar}
          style={!sidebar ? { left: '62px' } : { left: '220px' }}
        >
          {sidebar ? (
            <HiChevronLeft style={{ color: 'white' }} />
          ) : (
            <HiChevronRight style={{ color: 'white' }} />
          )}
        </ButtonIcon>
        <SectionTop>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Logo type="small" img="/logo100.png" />
=======
          <Logo img="/eaz1.png" sizes={!sidebar ? '' : 'medium'} />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo img="/eaz1.png" sizes={!sidebar ? '' : 'medium'} />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo img="/eaz1.png" sizes={!sidebar ? '' : 'medium'} />
>>>>>>> parent of 5f192ef (email setting)
=======
          <Logo type="small" img="/logo100.png" />
>>>>>>> parent of 4c94207 (email setting)
        </SectionTop>
        <MainNav sidebar={sidebar} />
      </StyledSidebar>
    )
  }
}
export default Sidebar
