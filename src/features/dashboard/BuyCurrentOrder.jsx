import styled from 'styled-components'

import TestForm from '../test/TestForm'

import { devicesMax } from '../../styles/breakpoint'
import { useUser } from '../authentication/useUser'
import OrderDetail from '../buy/OrderDetail'
import { useState } from 'react'

const StyledOrder = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
  position: relative;

  @media ${devicesMax.lg} {
    flex-direction: column;
  }
  @media ${devicesMax.md} {
    padding: 1rem;
  }
  @media ${devicesMax.sm} {
    padding: none;
  }
`

function BuyCurrentOrder() {
  const [payment, setPayment] = useState('')
  const { user } = useUser()
  const fullName =
    user.user_metadata.firstName + ' ' + user.user_metadata.lastName

  function checkPayment(payment) {
    setPayment(payment)
  }

  return (
    <StyledOrder>
      <OrderDetail onPayment={checkPayment} />
      <TestForm fullName={fullName} payment={payment} />
    </StyledOrder>
  )
}

export default BuyCurrentOrder
