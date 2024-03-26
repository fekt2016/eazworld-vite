import styled from 'styled-components'

import TestForm from '../test/TestForm'

import { devicesMax } from '../../styles/breakpoint'
import { useUser } from '../authentication/useUser'
import OrderDetail from '../buy/OrderDetail'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Spinner from '../../ui/Spinner'
import { getCurrentBuy } from '../../services/apibuy'

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
  const { user } = useUser()
  const fullName =
    user.user_metadata.firstName + ' ' + user.user_metadata.lastName

  const { orderId: order_id } = useParams()

  const { isLoading, data: buy } = useQuery({
    queryKey: ['buy'],
    queryFn: () => getCurrentBuy(order_id),
  })

  if (isLoading) return <Spinner />
  const { data } = buy

  return (
    <StyledOrder>
      <OrderDetail buy={data} isLoading={isLoading} />
      <TestForm fullName={fullName} payment={data[0].payment} />
    </StyledOrder>
  )
}

export default BuyCurrentOrder
