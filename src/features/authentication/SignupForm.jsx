import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signup } from '../../services/apiAuth'

// Email regex: /\S+@\S+\.\S+/

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

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm()
  // const { errors } = formState

  function onSubmit({ firstName, lastName, email, password, phone }) {
    console.log(firstName, lastName, email, password, phone)
    signup(
      { firstName, lastName, email, password, phone },
      {
        onSettled: reset(),
      },
    )
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Fisrt Name" error={errors?.firstName?.message}>
          <Input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'This field is required' })}
          />
        </FormRow>
        <FormRow label="Last Name" error={errors?.lastName?.message}>
          <Input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'This field is required' })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide valid email address',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'passwords need to match',
            })}
          />
        </FormRow>
        <FormRow label="Phone Number" error={errors?.mobile?.message}>
          <Input
            type="phone"
            id="phone"
            {...register('phone', {
              required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow>
          <Button>Sign Up</Button>
        </FormRow>
        <StyledFooter>
          <StyledBtn to="/login">Already have an account? Login</StyledBtn>
        </StyledFooter>
      </Form>
    </>
  )
}

export default SignupForm
