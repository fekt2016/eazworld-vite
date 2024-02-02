/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatTime } from '../../utils/helpers'
import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import { Link } from 'react-router-dom'
// import Menus from '../../ui/Menus'

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
// const Price1 = styled.div`
//   font-family: 'Sono';
//   font-weight: 600;
// `
const Payment = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const Date = styled.div`
  /* @media ${devicesMax.md} {
    display: none;
  } */
`
const BuyId = styled.div`
  text-transform: capitalize;
`

function BuyRow({ buy }) {
  const {
    created_at: date,
    orderId: buyId,
    amountUSD,
    amountGh,
    currency,
    totalToPay,
    payment,
    status,
  } = buy

  return (
    <>
      <Table.Row columns="repeat(7, 1fr)">
        <Date>{formatTime(date)}</Date>
        <BuyId>
          <Link to={`/currentOrder/${buyId}`}>{buyId}</Link>
        </BuyId>
        <Buy>{currency}</Buy>
        <Price>&#36;{amountUSD}</Price>
        <Price>&#8373;{amountGh}</Price>
        <Price>&#8373;{totalToPay}</Price>
        <Payment>{payment}</Payment>
        <Status>
          <Link to={`/buy-currentOrder/${buyId}`}>{status}</Link>
        </Status>
        {/* <Menus.Menu>
          <Menus.Toggle id={buyId} />
          <Menus.List id={buyId}>
            {buyId}
            <div>&#8373;{amountGh}</div>
            <div>&#36;{amountUSD}</div>
            <Menus.Button>Duplicate</Menus.Button>
            <Menus.Button>edit</Menus.Button>
            <Menus.Button>delete</Menus.Button>
          </Menus.List>
        </Menus.Menu> */}
      </Table.Row>
    </>
  )
}

export default BuyRow
