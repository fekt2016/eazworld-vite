import styled from 'styled-components'
import { devicesMax } from '../styles/breakpoint'
import { useParams } from 'react-router-dom'
import Button from '../ui/Button'
import { useQuery } from '@tanstack/react-query'
import { getCurrentSell } from '../services/apiSell'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'

import Spinner from '../ui/Spinner'
import { useState } from 'react'

const StyledOrder = styled.div`
  background-color: var(--color-black-200);
  border-radius: 7px;
  overflow: hidden;
`
const HeadingBox = styled.div`
  background-color: var(--color-black-950);
  padding: 1rem;
  margin: 4rem;
`
const H4 = styled.h4`
  color: var(--color-white-0);
  font-family: 'Courier New', Courier, monospace;
  text-transform: capitalize;
`

const DetailBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TextBox = styled.div`
  background-color: var(--color-litecoin-500);
  width: 50%;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 4rem;
  text-transform: capitalize;

  @media ${devicesMax.md} {
    width: 95%;
  }
`
const StyledSpan = styled.span`
  background-color: var(--color-black-950);
  padding: 1rem;
  color: var(--color-white-0);
  width: 15rem;
  text-transform: capitalize;
  margin-right: 5rem;

  @media ${devicesMax.md} {
    width: 100%;
  }
`
const StyledDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  @media ${devicesMax.md} {
    flex-direction: column;
    width: 100%;
    justify-content: center;
  }
`
const Img = styled.img`
  height: 15rem;
`

const P = styled.p`
  color: var(--color-red-700);
`
const Ps = styled.p`
  width: 50%;
  margin: 0 auto;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 1rem;
  @media ${devicesMax.md} {
    width: 90%;
  }
`
const StyledP = styled.span`
  color: var(--color-bitcoin-900);
`

function SellCurrentOrder() {
  // const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)

  const { orderId: order_id } = useParams()

  const { isLoading, data: sell } = useQuery({
    queryKey: ['sell'],
    queryFn: () => getCurrentSell(order_id),
  })

  if (isLoading) return <Spinner />
  const { data: currentData } = sell
  console.log(currentData)
  return (
    <>
      <StyledOrder>
        <HeadingBox>
          <H4>Selling preview</H4>
        </HeadingBox>
        {currentData.map((sell) => (
          <DetailBox key={sell.orderId}>
            <TextBox>
              <h5>Thank you for your order!</h5>
              <p>The order confirmation has been sent to your email address.</p>
            </TextBox>
            <TextBox>
              <p>
                You are selling <StyledP>{sell.amountUSD}USD</StyledP>
                And will receive <StyledP>{sell.amountGh}GHS</StyledP> At{' '}
                <StyledP>12GHS</StyledP> per <StyledP>1 USD</StyledP>
              </p>
            </TextBox>
            <StyledDetail>
              <StyledSpan>Order Number: </StyledSpan>
              {sell.orderId}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>SEND Amount</StyledSpan>
              <span style={{ margin: '1rem' }}>0.00109853 BTC</span>
              <CopyToClipboard onCopy={() => setCopied(true)} text={0.00109853}>
                <Button>Copy Code</Button>
              </CopyToClipboard>
              {copied ? toast.success('copied') : ''}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>to wallet address</StyledSpan>
              <span style={{ margin: '1rem' }}>{sell.wallet}</span>
              <CopyToClipboard
                onCopy={() => setCopied(true)}
                text={sell.wallet}
              >
                <Button>Copy Address</Button>
              </CopyToClipboard>
              {copied ? toast.success('copied') : ''}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Account Type: </StyledSpan>
              {sell.paymentType}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Phone Number: </StyledSpan>
              {sell.mobile}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Name: </StyledSpan>
              {sell.name}
            </StyledDetail>
            <StyledDetail>
              <div>
                <Img src="../../wallet.png" alt="wallet" />
                <P>Scan the address to send </P>
              </div>
            </StyledDetail>
            <Ps>
              Please make sure you provide the right mobile money number and
              name. Also, note that mobile money payments take up to 30 minutes
              to get processed.
            </Ps>
          </DetailBox>
        ))}
      </StyledOrder>
    </>
  )
}

export default SellCurrentOrder
