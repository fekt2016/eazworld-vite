import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Form from '../ui/Form'
import Input from '../ui/Input'
import FormRow from '../ui/FormRow'
import { useCreatePayment } from '../features/CurrentOrder/useCreatePayment'
import SpinnerMini from '../ui/SpinnerMini'
import { devicesMax } from '../styles/breakpoint'
import Select from '../ui/Select'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../ui/Spinner'

import { getCurrentBuy } from '../services/apibuy'

const StyledOrder = styled.div`
  background-color: var(--color-black-200);
  border-radius: 7px;
  overflow: hidden;
`
const HeadingBox = styled.div`
  background-color: var(--color-black-950);
  padding: 1rem;
`
const H4 = styled.h4`
  color: var(--color-white-0);
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
  margin-right: 5rem;
  text-transform: capitalize;
  @media ${devicesMax.md} {
    width: 100%;
  }
`
const StyledDetail = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;

  @media ${devicesMax.md} {
    flex-direction: column;
    width: 100%;
    justify-content: center;
  }
`
const StyledPay = styled.div`
  background-color: var(--color-doge-500);
  width: 70%;
  margin: 2rem auto;
  text-align: center;
  padding: 1rem;
  border-radius: 20px;
  @media ${devicesMax.md} {
    width: 95%;
  }
`
const StyledBtn = styled.div`
  margin: 4rem;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
`
const ToPay = styled.span`
  color: var(--color-white-0);
  background-color: var(--color-black-950);
  padding: 1rem;
  border-radius: 10px;
  margin: 0.5rem;

  transition: all 0.3s;
  display: inline-block;
  &:hover {
    transform: scale(1.5);
  }
`
const SpanNum = styled.span`
  background-color: var(--color-black-900);
  padding: 1rem;
  border-radius: 100px;
  color: var(--color-white-0);
  transition: all 0.3s;
  display: inline-block;
  &:hover {
    transform: scale(1.5);
  }
`
const P = styled.p`
  color: var(--color-red-700);
`

const Error = styled.p`
  color: var(--color-red-700);
  text-align: center;
`
function BuyCurrentOrder() {
  const [phoneNum, setPhoneNum] = useState('')
  const [amount, setAmount] = useState('')
  const [transaction, setTransaction] = useState('')
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState()

  const { orderId: order_id } = useParams()

  const { isLoading, data: buy } = useQuery({
    queryKey: ['buy'],
    queryFn: () => getCurrentBuy(order_id),
  })

  const { createPayment, isCreating } = useCreatePayment()

  function handleSubmit(e) {
    e.preventDefault()
    if (!phoneNum || !amount || !transaction || !account || !name) {
      setError({
        title: 'Invalid input',
        message: 'Please enter the credentials',
      })
      return
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const pay = currentData[0]
    console.log(pay)
<<<<<<< HEAD
>>>>>>> parent of 85fe006 (work start)
=======
>>>>>>> parent of 85fe006 (work start)
=======
>>>>>>> parent of 4c94207 (email setting)

    createPayment(
      { phoneNum, amount, transaction, account, name },

      {
        onSettled: () => {
          setPhoneNum('')
          setAmount('')
          setTransaction('')
          setAccount('')
          setName('')
        },
      },
    )
  }

  if (isLoading) return <Spinner />
  const { data: currentData } = buy
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(currentData)
=======

>>>>>>> parent of 4c94207 (email setting)
=======

>>>>>>> parent of 005e1ed (avatar)
  return (
    <>
      <StyledOrder>
        <HeadingBox>
          <H4>Buying preview</H4>
        </HeadingBox>
        {currentData?.map((item) => (
          <DetailBox key={item.orderId}>
            <TextBox>
              <h5>Thank you for your order!</h5>
              <p>The order confirmation has been sent to your email address.</p>
            </TextBox>
            <StyledDetail>
              <StyledSpan>Order Number: </StyledSpan>
              {item.orderId}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Currency: </StyledSpan>
              {item.currency}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Amount USD: </StyledSpan>${item.amountUSD}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Amount Gh: </StyledSpan>&#8373;{item.amountGh}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Sending fee: </StyledSpan>&#8373;
<<<<<<< HEAD
              {item.miner * 12}
=======
              {item?.miner * 12}
>>>>>>> parent of 4c94207 (email setting)
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>payment Type: </StyledSpan>
              {item.payment}
            </StyledDetail>
            <StyledDetail>
              <StyledSpan>Wallet </StyledSpan>
              {item.wallet}
            </StyledDetail>
            <StyledPay>
              Send payment to the Number:{' '}
              <SpanNum>0542011274 easyworldpc(Merchant)</SpanNum>
              {'  '}
              Total To pay: <ToPay>&#8373;{item.totalToPay}</ToPay>
            </StyledPay>
            <P>
              Make your order Number {item.orderId} the reference when you are
              sending the momo payment.
            </P>
            <P>For any other assistance contact 0244388190</P>
          </DetailBox>
        ))}

        <StyledBtn>
          <Modal>
            <Modal.Open opens="pay">
              <Button>Add Payment</Button>
            </Modal.Open>
            <Modal.Window name="pay">
              <div>
                {error && <Error>{error.message}</Error>}
                <Form onSubmit={handleSubmit}>
                  <FormRow label="Momo Number">
                    <Input
                      type="tel"
                      onChange={(e) => setPhoneNum(e.target.value)}
                    />
                  </FormRow>
                  <FormRow label="Momo Name">
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormRow>
                  <FormRow label="Account Type">
                    <Select onChange={(e) => setAccount(e.target.value)}>
                      <option>Merchant</option>
                      <option>Subscriber</option>
                    </Select>
                  </FormRow>
                  <FormRow label="Amount sent">
                    <Input
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </FormRow>
                  <FormRow label="Transaction No.">
                    <Input
                      type="number"
                      onChange={(e) => setTransaction(e.target.value)}
                      maxLength="11"
                    />
                  </FormRow>

                  <FormRow>
                    <Button>{isCreating ? <SpinnerMini /> : 'Submit'}</Button>
                  </FormRow>
                </Form>
              </div>
            </Modal.Window>
          </Modal>
        </StyledBtn>
      </StyledOrder>
    </>
  )
}

export default BuyCurrentOrder
