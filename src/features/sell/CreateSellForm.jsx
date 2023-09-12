import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import StyledSelect from '../../ui/Select'

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

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

const StyledTerm = styled.div`
  width: 60%;
  text-align: center;
  padding: 1rem;
`
function onSubmit(data) {
  console.log(data)
}

function CreateCabinForm() {
  const { register, control, handleSubmit, watch } = useForm()
  const watchUsd = watch('amountUsd')
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="currency">Select Currency</Label>
          <Input type="text" id="currency" {...register('currency')} />
        </FormRow>

        <FormRow>
          <Label htmlFor="amountUsd">Amount Usd</Label>
          <Input type="number" id="amountUsd" {...register('amountUsd')} />
        </FormRow>

        <FormRow>
          <Label htmlFor="amountgh">Amount Gh</Label>
          <Input
            type="number"
            id="amountgh"
            {...register('amountgh')}
            defaultValue={watchUsd}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="payment">Payment Method</Label>
          <StyledSelect id="payment">
            <option>mtm momo</option>
            <option>voda cash</option>
            <option>at money </option>
          </StyledSelect>
        </FormRow>

        <StyledTerm>
          By clicking the order button is that you have agreed that all infor
          mation pro vide are correct and you should be held liable for payment
          detail s submitted
        </StyledTerm>

        <FormRow>
          <Button>Order</Button>
        </FormRow>
      </Form>
      <DevTool control={control} />
    </>
  )
}

export default CreateCabinForm
