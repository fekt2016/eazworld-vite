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
<<<<<<< HEAD
import { useUser } from '../authentication/useUser'
<<<<<<< HEAD

<<<<<<< HEAD
=======
=======
import { randomOrderId } from '../../utils/helpers'
import SpinnerMini from '../../ui/SpinnerMini'

<<<<<<< HEAD
>>>>>>> parent of 49283c7 (final)
=======
// import { useUser } from '../authentication/useUser'
>>>>>>> parent of 4c94207 (email setting)
=======
>>>>>>> parent of 49283c7 (final)
const SellContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 10px;
`
const Advert = styled.div`
  flex: 1;
`
>>>>>>> parent of 49283c7 (final)
const StyledTerm = styled.div`
  width: 50%;
  text-align: center;
  padding: 1rem;
  align-self: start;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-primary-300);
  border-radius: var(--border-radius-lg);
  @media ${devicesMax.md} {
    width: 100%;
  }
`

function CreateSellForm() {
  const seq = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)

  const orderId = `EW${seq}`

  const { createSell, isCreating } = useCreateSell()
<<<<<<< HEAD
  const { user } = useUser()
  console.log(user.user_metadata.firstName)
=======
  // const { user } = useUser()
  // console.log(user.user_metadata.firstName)
>>>>>>> parent of 4c94207 (email setting)
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
    createSell(
      { ...data },
      {
        onSuccess: () => {
          reset()
          navigate(`/sell-currentOrder/${orderId}`)
        },
      },
    )
<<<<<<< HEAD
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
=======
    // emailjs
    //   .send(
    //     import.meta.env.VITE_YOUR_SERVICE_ID,
    //     import.meta.env.VITE_YOUR_TEMPLAT_BUY_ID,
    //     {
    //       from_name: user.user_metadata.firstName,
    //       recipient: user.email,
    //       orderId,
    //       currency: data.currency,
    //       amountGh: data.amountGh,
    //       amountUSD: data.amountUSD,
    //       Payment: data.payment,
    //     },
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result)
    //     },
    //     (error) => {
    //       console.log(error.text)
    //     },
    //   )
>>>>>>> parent of 4c94207 (email setting)
  }
  return (
<<<<<<< HEAD
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency">
          <Select {...register('currency')}>
            <option>Bitcon</option>
            <option>Tether</option>
            <option>Ethereun</option>
=======
    <SellContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency" error={errors?.currency?.message}>
          <Select {...register('currency', { required: 'select currency' })}>
            <option value="" disabled selected>
              Select Currency
            </option>
<<<<<<< HEAD
            <option>Bitcoin</option>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 49283c7 (final)
=======
            <option>Bitcon</option>
>>>>>>> parent of 4c94207 (email setting)
=======
>>>>>>> parent of 49283c7 (final)
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
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="MTN Momo">MTN Momo</option>
            <option value="Vodafone cash">Vodafone cash</option>
            <option value="At Money">At Money</option>
          </Select>
        </FormRow>
<<<<<<< HEAD
        <FormRow label="Mobile Number" error={errors?.mobile?.message}>
          <Input type="number" id="mobile" {...register('mobile')} />
=======
        <FormRow label="Payment Number" error={errors?.mobile?.message}>
          <Input
            type="tel"
            id="mobile"
            {...register('mobile', {
              required: 'Your mobile number is required',
              pattern: {
                value: /^(([2][3][3])|[0])?\d{9}$/,
                message: 'check your number',
              },
            })}
          />
>>>>>>> parent of 4c94207 (email setting)
        </FormRow>
        <FormRow label="Mobile Name" error={errors?.name?.message}>
          <Input type="text" id="name" {...register('name')} />
        </FormRow>
        <FormRow label="Payment Type">
          <Select {...register('paymentType')}>
            <option disabled> Payment type</option>
            <option selected>Subscriber</option>
            <option>Merchant</option>
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
        <FormRow>
          <Input
            type="hidden"
            id="wallet"
            {...register('wallet')}
            defaultValue={'bc1q73rd9uh6279pp2tcew5t0e5s72wr6d4pyxsrsw'}
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

export default CreateSellForm
