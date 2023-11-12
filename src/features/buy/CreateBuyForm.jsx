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

const Select = styled.select`
  flex-basis: 50rem;
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
  width: 70%;
  text-align: center;
  padding: 1rem;
  align-self: center;
  background-color: var(--color-grey-300);
  margin: 2rem;
  @media ${devicesMax.sm} {
    width: 100%;
  }
`

function CreateBuyForm() {
  const seq = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)

  const orderId = `ew${seq}`

  const { createBuy, isCreating } = useCreateBuy()

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

  function onSubmit(data) {
    createBuy(
      { ...data },
      {
        onSuccess: () => {
          reset()
          navigate(`/currentOrder/${orderId}`)
        },
      },
    )
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Select Currency">
          <Select {...register('currency')}>
            <option>Bitcoin</option>
            <option>Tether</option>
            <option>ethereum</option>
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
            <option>MTN Momo</option>
            <option>Voda cash</option>
            <option>At Money</option>
          </Select>
        </FormRow>
        <FormRow label="Wallet address" error={errors?.wallet?.message}>
          <Input
            type="text"
            id="wallet"
            {...register('wallet', {
              required: 'Wallet address required',
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
          By clicking the order button, You have agreed that all information
          provide are correct and you should be held liable for payment detail s
          submitted
        </StyledTerm>
        <FormRow>
          <Button>{isCreating ? 'Submitting' : 'Place an Order'}</Button>
        </FormRow>
      </Form>

      <DevTool control={control} />
    </>
  )
}

export default CreateBuyForm
