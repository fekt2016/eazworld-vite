/*eslint react/prop-types : 0 */
import styled from 'styled-components'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import FormRow from '../../ui/FormRow'
import { useNavigate } from 'react-router-dom'
import { useCreateBuy } from '../buy/useCreateBuy'
import { devicesMax } from '../../styles/breakpoint'
import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useUser } from '../authentication/useUser'
import { randomOrderId } from '../../utils/helpers'

const rate = import.meta.env.VITE_RATE

const BuyContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 10px;
`
const Advert = styled.div`
  flex: 1;
`
>>>>>>> parent of 49283c7 (final)

const Select = styled.select`
  /* flex-basis: 50rem; */
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  @media ${devicesMax.md} {
    width: 100%;
    flex-basis: auto;
  }
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

function CreateBuyForm() {
  const seq = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)

  const orderId = `EW${seq}`

  const { createBuy, isCreating } = useCreateBuy()
  const { user } = useUser()
  console.log(user.user_metadata.firstName)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    setValue,
    getValues,
  } = useForm()
  const { errors } = formState
  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), [])

  function onSubmit(data) {
    createBuy(
      { ...data },
      {
        onSuccess: () => {
          reset()
          navigate(`/buy-currentOrder/${orderId}`)
        },
      },
    )
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user.email,
          orderId,
          currency: data.currency,
          amountGh: data.amountGh,
          amountUSD: data.amountUSD,
          Payment: data.payment,
          TotaltoPay: data.totalToPay,
          wallet: data.wallet,
          miner: data.miner,
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
            <option disabled selected>
              Select currency
            </option>
            <option>Bitcoin</option>
            <option>Tether</option>
          </Select>
        </FormRow>
        <FormRow error={errors?.amountUSD?.message} label="AmountUSD">
          <Input
            autoFocus
            type="number"
            id="amountUSD"
            {...register('amountUSD', {
              required: 'Dollar amount is required',
              valueAsNumber: true,
              onChange: (evt) => {
                const rate = 12
                const miner = getValues('miner') * rate
                const cedis = evt.target.value * rate
                const total = cedis + miner

                if (!isNaN(cedis && total)) {
                  setValue('amountGh', cedis)
                  setValue('totalToPay', total)
                }
              },
            })}
          />
        </FormRow>
        <FormRow label="AmountGh" error={errors?.amountGh?.message}>
          <Input
            type="number"
            id="amountGh"
            {...register('amountGh', {
              required: 'Cedis amount is required',
              valueAsNumber: true,
              onChange: (evt) => {
                const rate = 12
                const dollar = evt.target.value / rate
                if (!isNaN(dollar)) {
                  setValue('amountUSD', dollar)
                }
              },
            })}
          />
        </FormRow>
        <FormRow label="Miner">
          <Select
            {...register('miner', {
              onChange: (evt) => {
                const rate = 12
                const miner = evt.target.value * rate
                const cedis = getValues('amountGh')
                const total = miner + cedis

                if (!isNaN(miner && cedis)) {
                  setValue('totalToPay', total)
                }
              },
            })}
          >
<<<<<<< HEAD
            <option value={0.5}>Select Miners fee</option>
=======
            <option value="" disabled selected>
              Select Miners fee
            </option>
>>>>>>> parent of 9df51db (email setting)
            <option>0.5</option>
            <option>1.0</option>
          </Select>
        </FormRow>
        <FormRow label="TotalTopay">
          <Input
            type="number"
            id="totalToPay"
            {...register('totalToPay', {
              required: 'total is required',
            })}
          />
        </FormRow>
        <FormRow label="Payment method">
          <Select {...register('payment')}>
            <option disabled selected>
              Select Payment Method
            </option>
            <option value="Mtn Mono">
              MTN Momo <span>momo</span>
              <img src="../../../mtn.png" alt="mtn" />
            </option>
            <option value="Voda cash">Voda cash</option>
            <option value="At Money">At Money</option>
          </Select>
        </FormRow>
        <FormRow label="Wallet address" error={errors?.wallet?.message}>
          <Input
            type="text"
            id="wallet"
            {...register('wallet', {
              required: 'Wallet address required',
              pattern: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
            })}
          />
        </FormRow>
        <FormRow>
          <Input
            type="hidden"
            id="status"
            {...register('status')}
            defaultValue={'waiting payment'}
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
          <strong>Buying Terms: </strong>
          By clicking the order button, You have agreed that all information
          provide are correct and you should be held liable for payment details
          submitted
        </StyledTerm>
        <FormRow>
          <div>
            <Button>{isCreating ? 'Submitting' : 'Place an Order'}</Button>
          </div>
        </FormRow>
      </Form>

      <DevTool control={control} />
    </>
  )
}

export default CreateBuyForm
