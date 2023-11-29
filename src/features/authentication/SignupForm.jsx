import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'
import 'react-phone-number-input/style.css'

import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSignup } from './useSignup'
import { devicesMax } from '../../styles/breakpoint'
// import { devicesMax } from '../../styles/breakpoint'

// Email regex: /\S+@\S+\.\S+/

const StyledBtn = styled(NavLink)`
  padding: 0.5rem 1.5rem;
  color: var(--color-primary-700);
    text-decoration-line: underline;
  }
`
const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledPhoneInput = styled(PhoneInput)`
  border: 1px solid var(--color-gray-700);
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;

  flex-basis: 50rem;

  @media ${devicesMax.md} {
    width: 100%;
    flex-basis: auto;
  }
`

function SignupForm() {
  const { signup, isLoading } = useSignup()

  const {
    register,
    formState: { errors },
    getValues,
    control,
    handleSubmit,
    reset,
  } = useForm()
  // const { errors } = formState

  async function onSubmit({ firstName, lastName, email, password, phone }) {
    signup(
      { firstName, lastName, email, password, phone },
      {
        onSettled: reset(),
      },
    )
  }
  return (
    <>
      <Form type="signup" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Fisrt Name" error={errors?.firstName?.message}>
          <Input
            disabled={isLoading}
            type="text"
            id="firstName"
            {...register('firstName', { required: 'This field is required' })}
          />
        </FormRow>
        <FormRow label="Last Name" error={errors?.lastName?.message}>
          <Input
            disabled={isLoading}
            type="text"
            id="lastName"
            {...register('lastName', { required: 'This field is required' })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            disabled={isLoading}
            type="email"
            id="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Please provide valid email address',
              },
            })}
          />
        </FormRow>

        <FormRow label="Password (min 8)" error={errors?.password?.message}>
          <Input
            disabled={isLoading}
            type="password"
            id="password"
            {...register('password', {
              required: 'This field is required',
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message:
                  'Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            disabled={isLoading}
            type="password"
            id="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'passwords need to match',
            })}
          />
        </FormRow>
        <FormRow label="Phone Number" error={errors?.phone?.message}>
          <StyledPhoneInput
            disabled={isLoading}
            name="phoneInput"
            id="phone"
            control={control}
            defaultCountry="GH"
            rules={{
              required: true,
              pattern: {
                value: '/^(?[0]?)?[-.s]?d{2}[-.s]?d{3}[-.s]?d{4}?$/',
                message: 'check your phone',
              },
            }}
          />
        </FormRow>

        <FormRow>
          <Button disabled={isLoading}>Sign Up</Button>
        </FormRow>
        <StyledFooter>
          <StyledBtn to="/login">Already have an account? Login</StyledBtn>
        </StyledFooter>
      </Form>
    </>
  )
}

export default SignupForm
