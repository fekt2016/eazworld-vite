import { styled } from 'styled-components'
import RateItem from '../../features/home/RateItem'
import StyledSection from './Section'
import { useEffect, useState } from 'react'
import Spinner from '../../ui/Spinner'
import { devicesMax } from '../../styles/breakpoint'

const StyledUl = styled.ul`
  padding: 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;

  @media ${devicesMax.xl} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media ${devicesMax.sm} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    padding: 2rem;
  }
  @media ${devicesMax.sm} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    padding: 3rem;
  }
`

function RateCard() {
  const [crypto, setCrypto] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState('')

  useEffect(() => {
    async function fetchRate() {
      setIsLoading(true)
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false',
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const bitcoin = data[0]
      const ethereum = data[1]
      const tether = data[2]
      const binance = data[3]
      const litecoin = data[15]
      const ripple = data[5]
      const bitcoinCash = data[29]
      const shiba = data[14]
      const cardano = data[7]
      const doge = data[9]
      const solana = data[12]
      const dash = data[63]

      let cryptoData = []
      cryptoData.push(
        bitcoin,
        ethereum,
        tether,
        binance,
        litecoin,
        ripple,
        bitcoinCash,
        shiba,
        cardano,
        doge,
        solana,
        dash,
      )
      setCrypto(cryptoData)
      setIsLoading(false)
    }

    fetchRate().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
      console.log(error)
    })
  }, [])

  if (isLoading) {
    return (
      <StyledSection>
        <Spinner />
      </StyledSection>
    )
  }
  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <StyledSection type="rate">
      <StyledUl>
        {crypto.map((cryp) => (
          <RateItem cryp={cryp} key={cryp.id} />
        ))}
      </StyledUl>
    </StyledSection>
  )
}

export default RateCard
