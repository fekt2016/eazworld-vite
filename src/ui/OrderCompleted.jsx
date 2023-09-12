import { useState } from 'react'
import Heading from '../ui/Heading'
import { styled } from 'styled-components'
import Row from '../ui/Row'
import Button from './Button'
import StyledSelect from '../ui/Select'
import Input from '../ui/Input'
import Img from './Img'

const Order = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledBox = styled.div`
  margin-bottom: 2rem;
  font-size: 1.6rem;
`
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`
const StyledP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-red-700);
  margin-bottom: 2rem;
`

function OrderPage() {
  const [addPay, setAddPay] = useState(false)
  if (addPay)
    return (
      <Order>
        <Heading>add your payment details</Heading>
        <FormRow>
          <label htmlFor="payment">payment method: </label>
          <StyledSelect id="payment">
            <option>Mtn momo</option>
            <option>Voda cash</option>
            <option>At momo</option>
          </StyledSelect>
        </FormRow>
        <FormRow>
          <label htmlFor="amount"> Amount GH send:</label>
          <Input type="number" id="amount" />
        </FormRow>
        <FormRow>
          <label htmlFor="transaction">Transaction ID:</label>
          <Input type="text" id="transaction" />
        </FormRow>
        <FormRow>
          <div>
            <Button>Add Payment</Button>
          </div>
        </FormRow>
      </Order>
    )
  return (
    <Order>
      <Row>
        <Heading as="h3">Order completed successfully</Heading>
      </Row>

      <StyledBox>
        <span>Order No.: EW9774778</span>
      </StyledBox>
      <Img
        src="../../public/bitcoin-cash-cryptocurrency.256x253.png"
        alt="btc"
      />
      <StyledP>
        <p>Wallet address to receive fund</p>
      </StyledP>
      <StyledBox>
        <u>bc1qp4t95l4rqjjcv5hdmqmengkvycn2efjeljyxfa</u>
        <StyledP>Check once again</StyledP>
      </StyledBox>
      <StyledBox>Amount to receive:$100</StyledBox>
      <StyledBox>
        <h4>Thank you for the order</h4>
      </StyledBox>

      <StyledBox>
        <Button onClick={() => setAddPay(true)}>Add Payment </Button>
      </StyledBox>
    </Order>
  )
}

export default OrderPage
