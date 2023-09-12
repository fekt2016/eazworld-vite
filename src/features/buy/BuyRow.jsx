/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderCompleted from '../../ui/OrderCompleted'
import Table from '../../ui/Table'
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(8, 1fr);
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

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
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {
    created_at: date,
    id: buyId,
    AmountUsd,
    AmountGh,
    currency,
    total,
    payment,
    status,
  } = buy

  return (
    <>
      <Table.Row columns="repeat(6, 1fr)">
        <div>{formatDate(date)}</div>
        <div>{buyId}</div>
        <Buy>{currency}</Buy>
        <Price>&#36;{AmountUsd}</Price>
        <Price>&#8373;{AmountGh}</Price>
        <Price>&#8373;{total}</Price>
        <div>{payment}</div>
        <Status onClick={() => setIsOpenModal((show) => !show)}>
          {status}
        </Status>
      </Table.Row>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          {/* <BuyOrderDetails /> */}
          <OrderCompleted />
        </Modal>
      )}
    </>
  )
}

export default BuyRow
