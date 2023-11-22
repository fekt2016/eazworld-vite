import styled from 'styled-components'
import { devicesMax } from '../styles/breakpoint'
import { useParams } from 'react-router-dom'
import Button from '../ui/Button'

// import { useState } from 'react'
// import Modal from '../ui/Modal'
// import Button from '../ui/Button'
// import Form from '../ui/Form'
// import Input from '../ui/Input'
// import FormRow from '../ui/FormRow'
// import { useCreatePayment } from '../features/CurrentOrder/useCreatePayment'
// import SpinnerMini from '../ui/SpinnerMini'
// import { devicesMax } from '../styles/breakpoint'
// import Select from '../ui/Select'
// import { useQuery } from '@tanstack/react-query'
// import Spinner from '../ui/Spinner'

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
  /* margin-right: 5rem; */

  @media ${devicesMax.md} {
    width: 100%;
  }
`
const StyledDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
  align-items: center;
  margin: 1rem;

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

function SellCurrentOrder() {
  const { orderId } = useParams()
  return (
    <>
      <StyledOrder>
        <HeadingBox>
          <H4>Selling preview</H4>
        </HeadingBox>
        <DetailBox>
          <TextBox>
            <h5>Thank you for your order!</h5>
            <p>The order confirmation has been sent to your email address.</p>
          </TextBox>
          <StyledDetail>
            <StyledSpan>Order Number: </StyledSpan>
            {orderId}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>SEND Amount</StyledSpan>
            0.00109853 BTC<Button>Copy Address</Button>
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>to wallet address</StyledSpan>
            bc1q73rd9uh6279pp2tcew5t0e5s72wr6d4pyxsrsw
            <Button>Copy Address</Button>
          </StyledDetail>
          <StyledDetail>
            <div>
              <Img src="../../wallet.png" alt="wallet" />
              <P>scan the address to send </P>
            </div>
          </StyledDetail>
          <p>waitng to receive your btc</p>
        </DetailBox>
      </StyledOrder>
    </>
  )
}

export default SellCurrentOrder
