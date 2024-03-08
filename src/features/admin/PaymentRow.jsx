import styled from 'styled-components'
import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import { formatTime } from '../../utils/helpers'
import { Link } from 'react-router-dom'

// const Status = styled.button`
//   font-size: 1rem;
//   padding: 0.4rem;
//   font-weight: 600;
//   font-family: 'Sono';
//   text-transform: capitalize;
//   color: white;
//   border: none;
//   background-color: ${(props) =>
//     props.status === 'add payment' ? '#000' : '#ffc337'};
//   transition: all 0.2s;
//   &:hover {
//     transform: scale(1.1);
//   }
// `

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;

  @media ${devicesMax.md} {
    /* display: none; */
  }
`

// const Payment = styled.div`
//   overflow: hidden;

//   @media ${devicesMax.md} {
//     display: none;
//   }

//   &:hover {
//     overflow: visible;
//   }
// `
// const Wallet = styled.div`
//   overflow: hidden;

//   &:hover {
//     overflow: visible;
//   }
// `
const Date = styled.div``
const OrderId = styled.div`
  text-transform: capitalize;
`

function PaymentRow({ pay }) {
  console.log(pay)

  return (
    <Table.Row columns="repeat(6, 1fr)">
      <Date>{formatTime(pay.created_at)}</Date>
      <OrderId>
        <Link to={`/currentOrder/${pay.orderId}`}>{pay.orderId}</Link>
      </OrderId>
      <Price>&#36;{pay.amount}</Price>
      <Price>0{pay.phoneNum}</Price>
      <Price>{pay.account}</Price>
      <Price>{pay.name}</Price>
      {/* <Payment>{email}</Payment> */}
      {/* <Status
        status={status}
        onClick={statusHandler}
        disabled={status === 'order completed'}
      >
        {status}
      </Status> */}
    </Table.Row>
  )
}

export default PaymentRow
