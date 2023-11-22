import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useCreateSell } from './useCreateSell'
import FormRow from '../../ui/FormRow'
import { devicesMax } from '../../styles/breakpoint'
import { useNavigate } from 'react-router-dom'
import Select from '../../ui/Select'
import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useUser } from '../authentication/useUser'

const StyledTerm = styled.div`
  width: 50%;
  text-align: center;
  padding: 1rem;
  align-self: center;
  box-shadow: var(--shadow-lg);
  @media ${devicesMax.sm} {
    width: 100%;
  }
`

function CreateCabinForm() {
  const seq = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)

  const orderId = `EW${seq}`

  const { createSell, isCreating } = useCreateSell()
  const { user } = useUser()
  console.log(user.user_metadata.firstName)
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState,
  } = useForm()

  const { errors } = formState
  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), [])

  function onSubmit(data) {
    console.log(data)
    createSell(
      { ...data },
      {
        onSuccess: () => {
          reset()
          navigate(`/sell-currentOrder/${orderId}`)
        },
      },
    )
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLAT_BUY_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user.email,
          orderId,
          currency: data.currency,
          amountGh: data.amountGh,
          amountUSD: data.amountUSD,
          Payment: data.payment,
        },
      )
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log(error.text)
        },
      )
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency">
          <Select {...register('currency')}>
            <option>bitcon</option>
            <option>Tether</option>
            <option>Ethereun</option>
          </Select>
        </FormRow>

        <FormRow label="Amount Usd" error={errors?.amountUSD?.message}>
          <Input
            type="number"
            id="amountUSD"
            {...register('amountUSD', {
              required: 'Dollar amount is required',
              valueAsNumber: true,
              onChange: (e) => {
                const rate = 12
                const cedis = e.target.value * rate
                if (!isNaN(cedis)) {
                  setValue('amountGh', cedis)
                }
              },
            })}
          />
        </FormRow>

        <FormRow label="Amount Gh" error={errors?.amountGh?.message}>
          <Input
            autoFocus
            type="number"
            id="amountGh"
            {...register('amountGh', {
              required: 'Cedis amount is required',
              valueAsNumber: true,
              onChange: (e) => {
                const rate = 12
                const dollar = e.target.value / rate
                if (!isNaN(dollar)) {
                  setValue('amountUSD', dollar)
                }
              },
            })}
          />
        </FormRow>

        <FormRow label="Payment Method">
          <Select {...register('payment')}>
            <option value="">Select Payment Method</option>
            <option value="MTN Momo">MTN Momo</option>
            <option value="Vodafone cash">Vodafone cash</option>
            <option value="At Money">At Money</option>
          </Select>
        </FormRow>
        <FormRow>
          <Input
            type="hidden"
            id="status"
            {...register('status')}
            defaultValue={'processing'}
          />
        </FormRow>
        <FormRow>
          <Input
            type="hidden"
            id="orderId"
            {...register('orderId')}
            defaultValue={`${orderId}`}
          />
        </FormRow>

        <StyledTerm>
          <strong>Selling Terms: </strong>By clicking the order button is that
          you have agreed that all information provide are correct and you
          should be held liable detail s submitted
        </StyledTerm>

        <FormRow>
          <Button>{isCreating ? 'Ordering' : 'Order'}</Button>
        </FormRow>
      </Form>
      <DevTool control={control} />
    </>
  )
}

export default CreateCabinForm
