import { styled } from 'styled-components'
import Card from '../features/dashboard/Card'

import { devicesMax } from '../styles/breakpoint'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useRate } from '../features/rate/useRate'
>>>>>>> parent of 49283c7 (final)
=======
import { useRate } from '../features/rate/useRate'
>>>>>>> parent of 49283c7 (final)
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
  return (
    <StyledUl>
      <Card
        color="btc"
        name="Bitcoin"
        image="../../bitcoin.png"
        sell="11.75"
        buy="11.00"
        stock="instock"
      />
      <Card
        color="usdt"
        name="Usdt"
        image="../../tether-cryptocurrency.256x253.png"
        sell="11.70"
        buy="10.90"
        stock="outstock"
      />
      <Card
        color="doge"
        name="doge"
        image="../../dogecoin-cryptocurrency.256x253.png"
        sell="11.75"
        buy="11.00"
        stock="instock"
      />
      <Card
        color="ethereum"
        name="ethereum"
        image="../../ethereum-cryptocurrency.256x253.png"
        sell="11.75"
        buy="11.00"
        stock="outstock"
      />
      <Card
        color="litecoin"
        name="litecoin"
        image="../../litecoin-cryptocurrency.256x253.png"
        buy="10.90"
        sell="00.00"
        stock="outstock"
      />
      <Card
        color="bitcsh"
        name="bitcoin-cash"
        image="../../bitcoin-cash-cryptocurrency.256x253.png"
        sell="11.00"
        buy="11.75"
        stock="instock"
      />
    </StyledUl>
  )
}

export default PriceCard
