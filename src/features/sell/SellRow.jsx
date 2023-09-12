/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderDetails from '../../ui/OrderDetails'
import Table from '../../ui/Table'
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr 1fr;
//   column-gap: 2.2rem;
//   align-items: center;
//   padding: 1.2rem 2.2rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `
const Status = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Sono';
  text-transform: capitalize;
  color: white;
  border: none;
  background-color: var(--color-black-950);
`
// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `

// const Price = styled.div`
//   font-family: 'Sono';
//   font-weight: 600;
// `

// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `

function SellRow({ sell }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {
    created_at: date,
    id: buyId,
    currency,
    amountUsd,
    payment,
    status,
  } = sell
  return (
    <>
      <Table.Row columns="repeat(6, 1fr)">
        <div>{formatDate(date)}</div>
        <div>{buyId}</div>
        <div>{currency}</div>
        <div>{amountUsd}</div>
        <div>{payment}</div>
        <Status onClick={() => setIsOpenModal((show) => !show)}>
          {status}
        </Status>
      </Table.Row>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default SellRow
