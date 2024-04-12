import styled from 'styled-components'

import SignupForm from '../features/authentication/SignupForm'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'
import { devicesMax } from '../styles/breakpoint'
import { Link } from 'react-router-dom'

const SignupLayout = styled.main`
  min-height: 100vh;
  padding: 0 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-900);

  @media ${devicesMax.md} {
    padding: 2rem 1rem;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white-0);
  border-radius: 7px;

  width: 40%;

  @media ${devicesMax.lg} {
    width: 70%;
    padding: 1rem;
  }
  @media ${devicesMax.md} {
    width: 65%;
  }
  @media ${devicesMax.sm} {
    width: 90%;
  }
`
function Signup() {
  return (
    <SignupLayout>
      <Container>
        <Link to="/">
          <Logo img="/4.png" sizes="medium" />
        </Link>
        <Heading as="h1">sign up</Heading>
        <SignupForm />
      </Container>
    </SignupLayout>
  )
}

export default Signup
