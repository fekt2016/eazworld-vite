/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderDetails from '../../ui/OrderDetails'
import Table from '../../ui/Table'

const Status = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Sono';
  /* text-transform: capitalize; */
  color: white;
  border: none;
  background-color: var(--color-black-950);
`

const Sell = styled.div`
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

function SellRow({ sell }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {
    created_at: date,
    id: buyId,
    currency,
    amountUSD,
    payment,
    status,
  } = sell
  return (
    <>
      <Table.Row columns="repeat(6, 1fr)">
        <div>{formatDate(date)}</div>
        <div>{buyId}</div>
        <Sell>{currency}</Sell>
        <Price>{amountUSD}</Price>
        <Price>{payment}</Price>
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
