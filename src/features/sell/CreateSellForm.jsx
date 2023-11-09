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

const StyledTerm = styled.div`
  width: 70%;
  text-align: center;
  padding: 1rem;
  align-self: center;
  @media ${devicesMax.sm} {
    width: 100%;
  }
`

function CreateCabinForm() {
  const { createSell, isCreating } = useCreateSell()
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

  function onSubmit(data) {
    console.log(data)
    createSell(
      { ...data },
      {
        onSuccess: (data) => {
          console.log(data)
          reset()
          navigate('/history')
        },
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
