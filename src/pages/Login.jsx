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
<<<<<<< HEAD
=======
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;

>>>>>>> parent of 4c94207 (email setting)
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 7px;
  width: 40%;
  padding: 6rem 2rem;
<<<<<<< HEAD
=======
  height: 70vh;
>>>>>>> parent of 4c94207 (email setting)

  @media ${devicesMax.lg} {
    width: 70%;
    padding: 1rem;
  }
  @media ${devicesMax.md} {
    width: 65%;
  }
  @media ${devicesMax.sm} {
    width: 85%;
  }
`

function Login() {
  return (
    <LoginLayout>
      <Container>
<<<<<<< HEAD
<<<<<<< HEAD
        <Logo img="../../logo100.png" type="small" margin="bottom" />
=======
        <Logo
          img="../../eaz1.png"
          type="login"
          // margin="bottom"
          sizes="big"
        />
>>>>>>> parent of 5f192ef (email setting)
=======
        <Logo img="../../logo100.png" type="small" margin="bottom" />
>>>>>>> parent of 4c94207 (email setting)
        <Heading as="h1">welcome back</Heading>
        <LoginForm />
      </Container>
    </LoginLayout>
  )
}

export default Login
