import Row from '../ui/Row'
import Heading from '../ui/Heading'
import BuyTable from '../features/buy/BuyTable'
import SellTable from '../features/sell/SellTable'
import { useState } from 'react'
import { styled } from 'styled-components'
import Button from '../ui/Button'
import BuyTableOperations from '../features/buy/BuyTableOperations'
import SellTableOperations from '../features/sell/SellTableOperations'
import { NavLink } from 'react-router-dom'

const StyledBtn = styled.div`
  width: 15%;

  display: flex;
  justify-content: space-between;
`
const StyledNav = styled(NavLink)``

function History() {
  const [toggle, setToggle] = useState(1)

  return (
    <>
      <Row>
        <Row type="horizontal">
          <StyledBtn>
            <StyledNav>
              <Button
                variation="secondary"
                size="medium"
                onClick={() => setToggle(1)}
              >
                Buy
              </Button>
            </StyledNav>
            <StyledNav>
              <Button
                variation="secondary"
                size="medium"
                onClick={() => setToggle(2)}
              >
                Sell
              </Button>
            </StyledNav>
          </StyledBtn>
        </Row>
        <Row type="horizontal">
          <Heading as="h1">
            {toggle === 1 ? 'buy history' : 'sell history'}
          </Heading>

          {toggle === 1 && <BuyTableOperations />}
          {toggle === 2 && <SellTableOperations />}
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
