import styled from 'styled-components'
import Table from '../../ui/Table'
import { formatTime } from '../../utils/helpers'
import { Link } from 'react-router-dom'

const Price = styled.div`
  text-transform: lowercase;
`
function PaymentRow({ pay }) {
  return (
    <Table.Row columns="repeat(6, 1fr)">
      <Price>{formatTime(pay.created_at)}</Price>
      <Price>
        <Link to={`/currentOrder/${pay.orderId}`}>{pay.orderId}</Link>
      </Price>
      <Price>&#36;{pay.amount}</Price>
      <Price>0{pay.phoneNum}</Price>
      <Price>{pay.account}</Price>
      <Price>{pay.name}</Price>
    </Table.Row>
  )
}

export default PaymentRow
