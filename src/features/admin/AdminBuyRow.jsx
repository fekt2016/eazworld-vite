import styled from 'styled-components'
import { formatDate } from '../../utils/helpers'
import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import { Link } from 'react-router-dom'
import { updateBuy } from '../../services/apibuy'
import emailjs from '@emailjs/browser'
import { useEffect } from 'react'

const Status = styled.button`
  font-size: 1rem;
  padding: 0.4rem;
  font-weight: 600;
  font-family: 'Sono';
  text-transform: capitalize;
  color: white;
  border: none;
  background-color: ${(props) =>
    props.status === 'add payment' ? '#000' : '#ffc337'};
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
const Date = styled.div``
const BuyId = styled.div`
  text-transform: capitalize;
`

function AdminBuyRow({ buy }) {
  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), [])
  const {
    id,
    created_at: date,
    orderId: buyId,
    amountUSD,
    amountGh,
    currency,
    totalToPay,
    payment,
    status,
    email,
    wallet,
  } = buy

  function statusHandler() {
    updateBuy(id)
    emailjs
      .send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_BUY_COMPLETED_TEMPLATE_ID,
        {
          recipient: email,
          orderId: buyId,
          currency: currency,
          amountGh: amountGh,
          amountUSD: amountUSD,
          Payment: payment,
          TotaltoPay: totalToPay,
          wallet: wallet,
        },
      )
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {
          console.log(error.text)
        },
      )
  }

  return (
    <>
      <Table.Row columns="repeat(7, 1fr)">
        <Date>{formatDate(date)}</Date>
        <BuyId>
          <Link to={`/currentOrder/${buyId}`}>{buyId}</Link>
        </BuyId>
        <Buy>{currency}</Buy>
        <Price>&#36;{amountUSD}</Price>
        <Price>&#8373;{amountGh}</Price>
        <Price>&#8373;{totalToPay}</Price>
        <Payment>{payment}</Payment>
        <Status status={status} onClick={statusHandler}>
          {status}
        </Status>
        <div>{email}</div>
      </Table.Row>
    </>
  )
}

export default AdminBuyRow
