import { styled } from 'styled-components'
import Card from '../features/dashboard/Card'
import Spinner from '../ui/Spinner'

import { devicesMax } from '../styles/breakpoint'
import { useRate } from '../features/admin/rate/useRate'

const StyledUl = styled.ul`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 30px;

  @media ${devicesMax.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devicesMax.md} {
    gap: 15px;

    width: 100%;
  }
  @media ${devicesMax.sm} {
    grid-template-columns: 1fr;
  }
`

function PriceCard() {
  const { isLoading, rate } = useRate()

  if (isLoading) return <Spinner />
  const { data: currentRate } = rate

  return (
    <StyledUl>
      {currentRate.map((rate) => (
        <Card
          key={rate.currency}
          color={rate.color}
          name={rate.currency}
          sell={rate.sell}
          buy={rate.buy}
          stock={rate.stock}
          image={rate.image}
        />
      ))}
    </StyledUl>
  )
}

export default PriceCard
