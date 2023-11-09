import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import FormRow from '../../ui/FormRow'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useLogin } from './useLogin'

const StyledBtn = styled(NavLink)`
  padding: 0.5rem 1.5rem;

  &:hover {
    text-decoration-line: underline;
  }
`
const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) return

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Log in'}
        </Button>
      </FormRow>
      <StyledFooter>
        <StyledBtn to="/recover-password" disabled={isLoading}>
          Forget password
        </StyledBtn>
        <StyledBtn to="/signup" disabled={isLoading}>
          Sign Up
        </StyledBtn>
      </StyledFooter>
    </Form>
  )
}

export default LoginForm
