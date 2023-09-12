import Row from '../ui/Row'
import Heading from '../ui/Heading'
import BuyTable from '../features/buy/BuyTable'
import SellTable from '../features/sell/SellTable'
import { useState } from 'react'
import { styled } from 'styled-components'
import Button from '../ui/Button'

const StyledBtn = styled.div`
  width: 15%;

  display: flex;
  justify-content: space-between;
`

function History() {
  const [toggle, setToggle] = useState(1)

  return (
    <>
      <Row>
        <Row type="horizontal">
          <StyledBtn>
            <Button
              variation="secondary"
              size="medium"
              onClick={() => setToggle(1)}
            >
              Buy
            </Button>
            <Button
              variation="secondary"
              size="medium"
              onClick={() => setToggle(2)}
            >
              Sell
            </Button>
          </StyledBtn>
        </Row>
        <Row type="horizontal">
          <Heading as="h1">
            {toggle === 1 ? 'buy history' : 'sell history'}
          </Heading>
          <p>filter/sort</p>
        </Row>
      </Row>
      <Row>
        {toggle === 1 && <BuyTable />}
        {toggle === 2 && <SellTable />}
      </Row>
    </>
  )
}

export default History
