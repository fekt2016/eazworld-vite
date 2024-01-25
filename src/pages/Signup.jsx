import styled from 'styled-components'

import SignupForm from '../features/authentication/SignupForm'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'
import { devicesMax } from '../styles/breakpoint'
import { Link } from 'react-router-dom'

const SignupLayout = styled.main`
  width: 50%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);

  @media ${devicesMax.md} {
    width: 80%;
  }
`
function Signup() {
  return (
    <SignupLayout>
      <Link to="/">
        <Logo img="/4.png" sizes="medium" />
      </Link>
      <Heading as="h1">sign up</Heading>
      <SignupForm />
    </SignupLayout>
  )
}

export default Signup
