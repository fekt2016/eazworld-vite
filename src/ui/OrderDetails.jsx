import { styled } from 'styled-components'
import Heading from './Heading'
import Button from './Button'

const Detail = styled.div`
  border: 1px solid var(--color-grey-300);
  padding: 2rem;
  background-color: var(--color-grey-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledSend = styled.div``
const Address = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 2rem;
`
const Note = styled.div`
  display: flex;
  flex-direction: column;
`
const Barcode = styled.div`
  background-color: yellowgreen;
  height: 10rem;
  width: 10rem;
`
const Img = styled.img`
  height: 7rem;
  width: 7rem;
`
function OrderDetails() {
  return (
    <Detail>
      <div>
        <Heading as="h3">Order successfully completed</Heading>
      </div>
      <StyledSend>
        <span>SEND EXTACTLY: </span>
        <span>0.0033756 BTC</span>
      </StyledSend>
      <Img src="../../bitcoin-cash-cryptocurrency.256x253.png" alt="btc" />
      <Address>
        Bitcoin: bc1qmml275jpgxrmqm3qpy95vhxxpym0tz7sz0r8zg
        <Button variation="secondary" href="">
          Copy bitcoin address
        </Button>
      </Address>
      <Note>
        <p>NB: Kindly Use priority fee to send bitcoin for faster confirm.</p>
        <span>OR SCAN TO SEND </span>
        <Barcode>barcode</Barcode>
      </Note>
      <p>Sell order pending...</p>
    </Detail>
  )
}

export default OrderDetails
