import styled from 'styled-components'
import Logo from '../ui/Logo'
import RecoverForm from '../features/authentication/RecoverForm'

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
      <RecoverForm />
    </StyledRecover>
  )
}

export default RecoverPassword
