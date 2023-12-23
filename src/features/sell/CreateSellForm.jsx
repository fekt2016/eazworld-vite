import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useCreateSell } from './useCreateSell'
import FormRow from '../../ui/FormRow'
import { devicesMax } from '../../styles/Breakpoint'
import { useNavigate } from 'react-router-dom'
import Select from '../../ui/Select'
import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useUser } from '../authentication/useUser'
import { randomOrderId } from '../../utils/helpers'
import SpinnerMini from '../../ui/SpinnerMini'

const rate = import.meta.env.VITE_RATE_SELL

const SellContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 10px;
  @media ${devicesMax.md} {
    flex-direction: column;
  }
`
const Advert = styled.div`
  flex: 1;
`
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
  const { createSell, isCreating } = useCreateSell()
  const { user } = useUser()

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
          navigate(`/sell-currentOrder/${data.orderId}`)
        },
      },
    )
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_SELL_TEMPLATE_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user.email,
          orderId: data.orderId,
          currency: data.currency,
          amountGh: data.amountGh,
          amountUSD: data.amountUSD,
          Payment: data.payment,
          wallet: data.wallet,
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
    <SellContainer>
      <Form type="buy" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency" error={errors?.currency?.message}>
          <Select {...register('currency', { required: 'select currency' })}>
            <option value="" disabled selected>
              Select Currency
            </option>
            <option>Bitcoin</option>
            <option>USDT</option>
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
                const dollar = e.target.value / rate
                if (!isNaN(dollar)) {
                  setValue('amountUSD', dollar)
                }
              },
            })}
          />
        </FormRow>

        <FormRow label="Payment Method" error={errors?.payment?.message}>
          <Select
            {...register('payment', { required: 'payment method required' })}
          >
            <option value="" disabled selected>
              Select Payment Method
            </option>
            <option value="MTN Momo">MTN Momo</option>
            <option value="Vodafone cash">Vodafone cash</option>
            <option value="At Money">At Money</option>
            <option>GT bank</option>
            <option>Eco Bank</option>
          </Select>
        </FormRow>
        <FormRow label="Payment Number" error={errors?.mobile?.message}>
          <Input
            type="tel"
            id="mobile"
            {...register('mobile', {
              required: 'Your mobile number is required',
            })}
          />
        </FormRow>
        <FormRow label="Mobile Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: 'name on momo is required',
              pattern: {
                value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                message: 'check your first and last name',
              },
            })}
          />
        </FormRow>
        <FormRow label="Payment Type" error={errors?.name?.message}>
          <Select
            {...register('paymentType', {
              required: 'select account type',
            })}
          >
            <option value="" disabled selected>
              Payment type
            </option>
            <option>Subscriber</option>
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
            defaultValue={randomOrderId()}
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
        <FormRow>
          <Input
            type="hidden"
            id="email"
            {...register('email')}
            defaultValue={user?.email}
          />
        </FormRow>
        <StyledTerm>
          <strong>Selling Terms: </strong>By clicking the order button is that
          you have agreed that all information provide are correct and you
          should be held liable detail s submitted
        </StyledTerm>

        <FormRow>
          <Button>{isCreating ? <SpinnerMini /> : 'Place an Order'}</Button>
        </FormRow>
      </Form>
      <Advert>advert</Advert>
      <DevTool control={control} />
    </SellContainer>
  )
}

export default CreateSellForm
