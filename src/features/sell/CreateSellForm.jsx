import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createSell } from '../../services/apiSell'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
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

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

const StyledTerm = styled.div`
  width: 60%;
  text-align: center;
  padding: 1rem;
`

function CreateCabinForm({ openModal }) {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, reset, setValue } = useForm()

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newSell) => createSell(newSell),
    onSuccess: () => {
      toast.success('New order successfully created')
      queryClient.invalidateQueries({
        queryKey: ['sell'],
      })
      reset()
      openModal()
    },
    onError: (err) => toast.error(err.message),
  })

  function onSubmit(data) {
    console.log(data)
    mutate(data)
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="currency">Select Currency</Label>
          <Select {...register('currency')}>
            <option>bitcon</option>
            <option>Tether</option>
            <option>Ethereun</option>
          </Select>
        </FormRow>

        <FormRow>
          <Label htmlFor="amountUSD">Amount Usd</Label>
          <Input
            type="number"
            id="amountUSD"
            {...register('amountUSD', {
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

        <FormRow>
          <Label htmlFor="amountGh">Amount Gh</Label>
          <Input
            autoFocus
            type="number"
            id="amountGh"
            {...register('amountGh', {
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

        <FormRow>
          <Label htmlFor="payment">Payment Method</Label>
          <Select {...register('payment')}>
            <option>mtn</option>
            <option>voda cash</option>
            <option>At Money</option>
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

        <StyledTerm>
          By clicking the order button is that you have agreed that all infor
          mation provide are correct and you should be held liable for payment
          detail s submitted
        </StyledTerm>

        <FormRow>
          <Button>{isCreating ? 'Ordering' : 'Order'}</Button>
          {/* <Button>ORDER</Button> */}
        </FormRow>
      </Form>
      <DevTool control={control} />
    </>
  )
}

export default CreateCabinForm
