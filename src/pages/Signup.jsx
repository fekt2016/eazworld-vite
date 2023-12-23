import styled from 'styled-components'

import SignupForm from '../features/authentication/SignupForm'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'
const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`
function Signup() {
  return (
    <SignupLayout>
<<<<<<< HEAD
<<<<<<< HEAD
      <Logo img="../../logo100.png" type="small" />
=======
      <Link to="/">
        <Logo img="/eaz1.png" sizes="signup" />
      </Link>
>>>>>>> parent of 5f192ef (email setting)
=======
      <Logo img="../../logo100.png" type="small" />
>>>>>>> parent of 4c94207 (email setting)
      <Heading as="h1">sign up and trade</Heading>
      <SignupForm />
    </SignupLayout>
  )
}

export default Signup
