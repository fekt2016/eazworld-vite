import { useEffect, useState } from 'react'
import Heading from '../ui/Heading'
import PriceCard from '../ui/Price'
import Row from '../ui/Row'
import supabase from '../services/supabase'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTest } from '../features/test/useTest'
import TestCard from '../ui/TestCard'
import Spinner from '../ui/Spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const StyledLink = styled(Link)`
  background-color: black;
  text-transform: capitalize;
  color: var(--color-white-0);
  padding: 1rem;
`
const Test = styled.div`
  padding: 3rem;
  background-color: var(--color-black-200);
`
function Dashboard() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
  }

  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const { data: dataList, isLoading } = useTest()

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

  if (isLoading) return <Spinner />

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
      <Test>
        <Slider {...settings}>
          {dataList.map((item) => (
            <TestCard
              key={item.id}
              fullName={item.fullName}
              msg={item.msg}
              loc={item.loc}
            />
          ))}
        </Slider>
      </Test>
    </>
  )
}

export default Dashboard
