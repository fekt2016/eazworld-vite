/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import { useState } from 'react'
import Modal from '../../ui/Modal'
import OrderCompleted from '../../ui/OrderCompleted'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { devicesMax } from '../../styles/breakpoint'

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
const Payment = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const Date = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const BuyId = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

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
      <Table.Row columns="repeat(7, 1fr)">
        <Date>{formatDate(date)}</Date>
        <BuyId>{buyId}</BuyId>
        <Buy>{currency}</Buy>
        <Price>&#36;{amountUSD}</Price>
        <Price>&#8373;{amountGh}</Price>
        <Price>&#8373;{totalToPay}</Price>
        <Payment>{payment}</Payment>
        <Status>{status}</Status>
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <OrderCompleted />
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

export default BuyRow
