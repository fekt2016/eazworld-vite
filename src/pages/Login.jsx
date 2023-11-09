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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 7px;
  width: 35%;
  padding: 2rem;
  @media ${devicesMax.md} {
    width: 60%;
  }
  @media ${devicesMax.sm} {
    width: 95%;
  }
`

function Login() {
  return (
    <LoginLayout>
      <Container>
        <Logo img="../../logo100.png" type="small" margin="bottom" />
        <Heading as="h1">welcome back</Heading>
        <LoginForm />
      </Container>
    </LoginLayout>
  )
}

export default Login
