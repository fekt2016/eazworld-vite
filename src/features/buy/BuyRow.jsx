/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderCompleted from '../../ui/OrderCompleted'
import Table from '../../ui/Table'

const Status = styled.button`
  font-size: 1rem;
  padding: 0.4rem;
  font-weight: 600;
  font-family: 'Sono';
  text-transform: capitalize;
  color: white;
  border: none;
  background-color: var(--color-black-950);
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

const Buy = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  text-transform: capitalize;
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `
function BuyRow({ buy }) {
  const {
    created_at: date,
    id: buyId,
    amountUSD,
    amountGh,
    currency,
    totalToPay,
    payment,
    status,
  } = buy

  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Table.Row columns="repeat(6, 1fr)">
        <div>{formatDate(date)}</div>
        <div>{buyId}</div>
        <Buy>{currency}</Buy>
        <Price>&#36;{amountUSD}</Price>
        <Price>&#8373;{amountGh}</Price>
        <Price>&#8373;{totalToPay}</Price>
        <div>{payment}</div>
        <Status onClick={() => setIsOpenModal((show) => !show)}>
          {status}
        </Status>
      </Table.Row>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <OrderCompleted />
        </Modal>
      )}
    </>
  )
}

export default BuyRow
