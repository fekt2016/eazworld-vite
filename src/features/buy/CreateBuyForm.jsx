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
import { devicesMax } from '../../styles/Breakpoint'
import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useUser } from '../authentication/useUser'
import { randomOrderId } from '../../utils/helpers'

const rate = import.meta.env.VITE_RATE_BUY

const BuyContainer = styled.div`
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

const Select = styled.select`
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
  const { createBuy, isCreating } = useCreateBuy()
  const { user } = useUser()

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
          navigate(`/buy-currentOrder/${data.orderId}`)
        },
      },
    )

    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_BUY_TEMPLATE_ID,
        {
          from_name: user.user_metadata.firstName,
          recipient: user?.email,
          orderId: data.orderId,
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
    <BuyContainer>
      <Form type="buy" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency" error={errors?.currency?.message}>
          <Select
            {...register('currency', {
              required: 'select currency',
            })}
          >
            <option value="" disabled selected>
              Select Currency
            </option>
            <option>Bitcoin</option>
          </Select>
        </FormRow>
        <FormRow error={errors?.amountUSD?.message} label="AmountUSD">
          <Input
            autoFocus
            type="number"
            step="any"
            id="amountUSD"
            {...register('amountUSD', {
              required: 'Dollar amount is required',
              valueAsNumber: true,
              onChange: (evt) => {
                // const rate = import.meta.env.VITE_RATE
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
            step="any"
            {...register('amountGh', {
              required: 'Cedis amount is required',
              valueAsNumber: true,
              onChange: (evt) => {
                // const rate = import.meta.env.VITE_RATE
                const dollar = evt.target.value / rate
                if (!isNaN(dollar)) {
                  setValue('amountUSD', dollar)
                }
              },
            })}
          />
        </FormRow>
        <FormRow label="Miner" error={errors?.miner?.message}>
          <Select
            {...register('miner', {
              required: 'select miners fee',
              onChange: (evt) => {
                // const rate = import.meta.env.VITE_RATE
                const miner = evt.target.value * rate
                const cedis = getValues('amountGh')
                const total = miner + cedis

                if (!isNaN(miner && cedis)) {
                  setValue('totalToPay', total)
                }
              },
            })}
          >
            <option value="" disabled selected>
              Select Miners fee
            </option>
            <option>15</option>
            <option>25</option>
          </Select>
        </FormRow>
        <FormRow label="TotalTopay">
          <Input
            type="number"
            step="any"
            id="totalToPay"
            {...register('totalToPay', {
              required: 'total is required',
            })}
          />
        </FormRow>
        <FormRow label="Payment method" error={errors?.payment?.message}>
          <Select
            {...register('payment', {
              required: 'select payment method',
            })}
          >
            <option value="" disabled selected>
              Select Payment Method
            </option>
            <option value="Mtn Momo">MTN Momo</option>
          </Select>
        </FormRow>
        <FormRow label="Wallet address" error={errors?.wallet?.message}>
          <Input
            error={errors?.wallet?.message}
            type="text"
            id="wallet"
            {...register('wallet', {
              required: 'Wallet address required',
              pattern: {
                value: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/s,
                message: 'check your wallet address',
              },
            })}
          />
        </FormRow>
        <FormRow>
          <Input
            type="hidden"
            id="status"
            {...register('status')}
            defaultValue={'add payment'}
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
            id="email"
            {...register('email')}
            defaultValue={user?.email}
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
      <Advert>advert</Advert>

      <DevTool control={control} />
    </BuyContainer>
  )
}

export default CreateBuyForm
