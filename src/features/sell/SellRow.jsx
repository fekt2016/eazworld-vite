/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderDetails from '../../ui/OrderDetails'
import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import Menus from '../../ui/Menus'

const Status = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Sono';
  color: white;
  border: none;
  background-color: var(--color-black-950);
  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`

const Sell = styled.div`
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

const Date = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const SellId = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

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
        <Date>{formatDate(date)}</Date>
        <SellId>{buyId}</SellId>
        <Sell>{currency}</Sell>
        <Price>{amountUSD}</Price>
        <Price>{payment}</Price>
        <Status onClick={() => setIsOpenModal((show) => !show)}>
          {status}
        </Status>
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <OrderDetails />
          </Modal>
        )}
        <Menus.Menu>
          <Menus.Toggle id={buyId} />
          <Menus.List id={buyId}>
            <Menus.Button>Duplicate</Menus.Button>
            <Menus.Button>edit</Menus.Button>
            <Menus.Button>delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Table.Row>
    </>
  )
}

export default SellRow
