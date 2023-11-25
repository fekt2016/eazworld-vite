import { styled } from 'styled-components'
import Card from '../features/dashboard/Card'

import { devicesMax } from '../styles/breakpoint'
const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 30px;
  /* margin-right: 2rem; */

  @media ${devicesMax.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devicesMax.md} {
    gap: 15px;
  }
  @media ${devicesMax.sm} {
    grid-template-columns: 1fr;
    /* padding: 1rem; */
  }
`

function Price() {
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

export default Price
