import styled from 'styled-components'
import { usePayment } from '../admin/usePayment'
import { formatTime } from '../../utils/helpers'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`
function Payment() {
  const { isLoading, data } = usePayment()

  if (isLoading) return <p>loading...</p>

  const { payment, count } = data

  return (
    <div>
      <div>{count}</div>
      {payment.map((pay) => (
        <Container key={pay.id}>
          <div>{pay.id}</div>
          <dive>{formatTime(pay.created_at)}</dive>
          <div>{}</div>
          <div>{pay.phoneNum}</div>
          <div>{pay.amount}</div>
          <div>{pay.transaction}</div>
          <div>{pay.orderId}</div>
          <div>{pay.subscriber}</div>
        </Container>
      ))}
    </div>
  )
}

export default Payment
