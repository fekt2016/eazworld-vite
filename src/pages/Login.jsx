import styled from 'styled-components'
import LoginForm from '../features/authentication/LoginForm'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'
import { devicesMax } from '../styles/breakpoint'

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 7px;
  width: 40%;
  padding: 6rem 2rem;
  /* height: 70vh; */

  @media ${devicesMax.lg} {
    width: 70%;
    padding: 1rem;
  }
  /* @media ${devicesMax.md} {
    width: 65%;
  }
  @media ${devicesMax.sm} {
    width: 85%;
  } */
`

function Login() {
  return (
    <LoginLayout>
      <Container>
        <Logo
          img="../../4.png"
          type="login"
          // margin="bottom"
          sizes="big"
        />
        <Heading as="h1">welcome back</Heading>
        <LoginForm />
      </Container>
    </LoginLayout>
  )
}

export default Login
