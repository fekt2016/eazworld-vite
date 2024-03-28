import styled from 'styled-components'
import { formatTime } from '../../utils/helpers'
import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import { Link } from 'react-router-dom'
import { useDeleteBuy } from '../admin/useDeleteBuy'
import SpinnerMini from '../../ui/SpinnerMini'
import Button from '../../ui/Button'
import { useUpdateBuy } from './useUpdateBuy'
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
  border-radius: 100px;
  box-shadow: var(--shadow-md);
  background-color: ${(props) =>
    props.status === 'add payment'
      ? 'var(--color-red-500)'
      : 'var(--color-whatsapp-100)'};
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
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
  overflow: hidden;

  @media ${devicesMax.md} {
    display: none;
  }

  &:hover {
    overflow: visible;
  }
`
const Wallet = styled.div`
  overflow: hidden;

  &:hover {
    overflow: visible;
  }
`
const Date = styled.div``
const BuyId = styled.div`
  text-transform: capitalize;
`

function AdminBuyRow({ buy }) {
  const { isDeleting, deleteBuy } = useDeleteBuy()
  const { isLoading, mutate } = useUpdateBuy()

  useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), [])
  const {
    id,
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
    mutate(id)
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

  function handleDelete() {
    deleteBuy(id)
  }

  return (
    <Table.Row columns="repeat(8, 1fr)" mincol="repeat(5, 1fr">
      <Date>{formatTime(buy.created_at)}</Date>
      <BuyId>
        <Link to={`/currentOrder/${buyId}`}>{buyId}</Link>
      </BuyId>
      <Price>&#36;{amountUSD}</Price>
      <Price>&#8373;{totalToPay}</Price>
      <Wallet>{wallet}</Wallet>
      <Payment>{email}</Payment>
      <Status
        status={status}
        onClick={statusHandler}
        disabled={status === 'order completed'}
      >
        {isLoading ? <SpinnerMini /> : `${status}`}
      </Status>
      <Button size="small" onClick={handleDelete}>
        {isDeleting ? <SpinnerMini /> : 'Delete'}
      </Button>
    </Table.Row>
  )
}

export default AdminBuyRow
