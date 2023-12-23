import styled from 'styled-components'
import { formatDate } from '../../../utils/helpers'
import Table from '../../../ui/Table'
import { devicesMax } from '../../../styles/breakpoint'
import { Link } from 'react-router-dom'
import Form from '../../../ui/Form'
import FormRow from '../../../ui/FormRow'
import Input from '../../../ui/Input'
import Select from '../../../ui/Select'
import Modal from '../../../ui/Modal'
import { useForm } from 'react-hook-form'
import { useUpdateRate } from './useUpdateRate'
import SpinnerMini from '../../../ui/SpinnerMini'
// import { useUpdateRate } from './useUpdateRate'

const Buy = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  text-transform: capitalize;
  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;

  @media ${devicesMax.md} {
    display: none;
  }
`

const Date = styled.div``
const BuyId = styled.div`
  text-transform: capitalize;
  //
`

function RateRow({ rate }) {
  const { updateRate, isUpdating } = useUpdateRate()

  const { id, created_at: date, currency, buy, sell, stock } = rate
  const { register, handleSubmit } = useForm()
  function onSubmit(data) {
    updateRate({ newRate: { ...data }, id })
  }

  return (
    <>
      <Table.Row columns="repeat(7, 1fr)">
        <Date>{formatDate(date)}</Date>
        <BuyId>
          <Link>{id}</Link>
        </BuyId>
        <Buy>{currency}</Buy>
        <Price>{buy}</Price>
        <Price>{sell}</Price>
        <Price>{stock}</Price>
        <Modal>
          <Modal.Open opens="rate">
            <button>edit</button>
          </Modal.Open>
          <Modal.Window name="rate">
            <di>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormRow label="buy rate">
                  <Input
                    id="buy"
                    type="number"
                    step="any"
                    {...register('buy')}
                  />
                </FormRow>
                <FormRow label="sell rate">
                  <Input
                    id="sell"
                    type="number"
                    step="any"
                    {...register('sell')}
                  />
                </FormRow>
                <FormRow label="stock">
                  <Select id="stock" {...register('stock')}>
                    <option>instock</option>
                    <option>out stock</option>
                  </Select>
                </FormRow>
                <FormRow>
                  <button>{isUpdating ? <SpinnerMini /> : 'edit'}</button>
                </FormRow>
              </Form>
            </di>
          </Modal.Window>
        </Modal>
      </Table.Row>
    </>
  )
}

export default RateRow
