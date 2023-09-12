/*eslint react/prop-types : 0 */
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import StyledSelect from '../../ui/Select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBuy } from '../../services/apibuy'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 2fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`
const Label = styled.label`
  font-weight: 500;
  text-transform: capitalize;
`

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

function CreateBuyForm({ openModal }) {
  const [amountGhc, setAmountGhc] = useState('')
  const [amountUsd, setAmountUsd] = useState('')
  const [total, setTotal] = useState('')
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, getValues } = useForm()

  const cemine = getValues().minersFee * 12
  console.log(cemine)

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newBuy) => createBuy(newBuy),
    onSuccess: () => {
      toast.success('New order successfully created')
      queryClient.invalidateQueries({
        queryKey: ['buycurrency'],
      })
      reset()
      openModal()
    },
    onError: (err) => toast.error(err.message),
  })

  function onSubmit(data) {
    mutate(data)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="currency">select currency</Label>
        <StyledSelect id="currency" {...register('currency')}>
          <option>bitcon</option>
          <option>tether</option>
          <option>etherem</option>
        </StyledSelect>
      </FormRow>
      <FormRow>
        <Label htmlFor="usd">amount to buy usd</Label>
        <Input
          value={amountUsd}
          type="number"
          id="amountUSD"
          {...register('amountUSD', {
            onChange: (e) => {
              setAmountGhc(e.target.value * 12)
              setAmountUsd(e.target.value)
              setTotal(e.target.value * 12)
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="amountGh">amount to buy ghc</Label>
        <Input
          value={amountGhc}
          type="number"
          id="amountGh"
          {...register('amountGh', {
            onChange: (e) => {
              setAmountGhc(e.target.value)
              setAmountUsd(e.target.value / 12)
              setTotal(e.target.value)
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="miner">miners fee</Label>
        <StyledSelect id="minersFee" {...register('minersFee')}>
          <option>0.5</option>
          <option>1.0</option>
        </StyledSelect>
      </FormRow>
      <FormRow>
        <Label htmlFor="totaltopay">totalToPay</Label>
        <Input
          value={total + cemine}
          type="number"
          id="totalToPay"
          {...register('totalToPay')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="payment">payment method</Label>
        <StyledSelect id="paymentMethod" {...register('paymentMethod')}>
          <option>mtm momo</option>
          <option>voda cash</option>
          <option>at money </option>
        </StyledSelect>
      </FormRow>
      <FormRow>
        <Label htmlFor="wallet">wallet address</Label>
        <Input type="text" id="wallet" {...register('wallet')} />
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
        <Button disabled={isCreating}>
          {isCreating ? 'Order in process...' : 'Place an Order'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateBuyForm
