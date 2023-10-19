import styled from 'styled-components'
import Logo from '../ui/Logo'
import RecoverForm from '../features/authentication/RecoverForm'
import Heading from '../ui/Heading'
import { NavLink } from 'react-router-dom'

const StyledRecover = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`

function RecoverPassword() {
  return (
    <StyledRecover>
      <Logo img="../../logo100.png" type="small" />
      <Heading as="h1">forget password</Heading>
      <p>
        Enter the email address you use on Eazworld. Well send you a link to
        reset your password.
      </p>
      <RecoverForm />
      <NavLink to="/login">login</NavLink>
    </StyledRecover>
  )
}

export default RecoverPassword
