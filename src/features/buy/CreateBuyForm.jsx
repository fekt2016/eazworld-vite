/*eslint react/prop-types : 0 */
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBuy } from '../../services/apibuy'
import { toast } from 'react-hot-toast'
import { DevTool } from '@hookform/devtools'

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
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
`

function CreateBuyForm({ openModal }) {
  const queryClient = useQueryClient()
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

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newBuy) => createBuy(newBuy),
    onSuccess: () => {
      toast.success('New order successfully created')
      queryClient.invalidateQueries({
        queryKey: ['buy'],
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
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="currency">Select currency</Label>
          <Select {...register('currency')}>
            <option>bitcoin</option>
            <option>Tether</option>
            <option>ethereum</option>
          </Select>
        </FormRow>
        <FormRow>
          <Label htmlFor="amountUSD">amount to buy usd</Label>
          <Input
            autoFocus
            type="number"
            id="amountUSD"
            {...register('amountUSD', {
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
          <Error>{errors.amountUSD?.message}</Error>
        </FormRow>
        <FormRow>
          <Label htmlFor="amountGh">amount to buy ghc</Label>
          <Input
            type="number"
            id="amountGh"
            {...register('amountGh', {
              required: 'cedis amount is required',
              onChange: (evt) => {
                const rate = 12
                const dollar = evt.target.value / rate
                if (!isNaN(dollar)) {
                  setValue('amountUSD', dollar)
                }
              },
            })}
          />
          <Error>{errors.amountGh?.message}</Error>
        </FormRow>
        <FormRow>
          <Label htmlFor="miner">miners fee</Label>
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
        <FormRow>
          <Label htmlFor="totalToPay">totalToPay</Label>
          <Input
            type="number"
            id="totalToPay"
            {...register('totalToPay', {
              required: 'total is required',
            })}
          />
          <Error>{errors.totalToPay?.message}</Error>
        </FormRow>
        <FormRow>
          <Label htmlFor="payment">payment method</Label>
          <Select {...register('payment')}>
            <option>mtn</option>
            <option>voda cash</option>
            <option>At Money</option>
          </Select>
        </FormRow>
        <FormRow>
          <Label htmlFor="wallet">wallet address</Label>
          <Input
            type="text"
            id="wallet"
            {...register('wallet', {
              required: 'wallet address required',
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
          <Button>{isCreating ? 'Submitting' : 'Place an Order'}</Button>
        </FormRow>
      </Form>
      <DevTool control={control} />
    </>
  )
}

export default CreateBuyForm
