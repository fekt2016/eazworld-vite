import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import supabase from '../services/supabase'
import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Form from '../ui/Form'
import Input from '../ui/Input'
import FormRow from '../ui/FormRow'
import { useCreatePayment } from '../features/CurrentOrder/useCreatePayment'
import SpinnerMini from '../ui/SpinnerMini'
import { devicesMax } from '../styles/breakpoint'

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
  margin: 0 auto;
  padding: 1rem;
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

function CurrentOrder() {
  const { orderId: id } = useParams()
  const [currentData, setCurrentData] = useState('')
  console.log(currentData)

  const [phoneNum, setPhoneNum] = useState('')
  const [amount, setAmount] = useState('')
  const [transaction, setTransaction] = useState('')
  const [name, setName] = useState('')

  const { createPayment, isCreating } = useCreatePayment()

  function handleSubmit(e) {
    e.preventDefault()
    if (!phoneNum || !amount || !transaction || !name) return
    createPayment(
      { phoneNum, amount, transaction, name },

      {
        onSettled: () => {
          setPhoneNum('')
          setAmount('')
          setTransaction('')
          setName('')
        },
      },
    )
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const { data: buy, error } = await supabase
        .from('buy')
        .select('*')
        .eq('orderId', id)

      if (error) throw new Error('there was an error')

      const [currentbuy] = buy
      setCurrentData(currentbuy)
    }
    fetchOrder()
  }, [id])

  return (
    <>
      <StyledOrder>
        <HeadingBox>
          <H4>Buying preview</H4>
        </HeadingBox>
        <DetailBox>
          <TextBox>
            <h5>Thank you for your order!</h5>
            <p>The order confirmation has been sent to your email address.</p>
          </TextBox>
          <StyledDetail>
            <StyledSpan>Order Number: </StyledSpan>
            {currentData.orderId}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Currency: </StyledSpan>
            {currentData.currency}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Amount USD: </StyledSpan>${currentData.amountUSD}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Amount Gh: </StyledSpan>&#8373;{currentData.amountGh}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>payment Type: </StyledSpan>
            {currentData.payment}
          </StyledDetail>
          <StyledDetail>
            <StyledSpan>Wallet </StyledSpan>
            {currentData.wallet}
          </StyledDetail>
        </DetailBox>

        <StyledPay>
          Send payment to the Number: 0542011274 easyworldpc(Merchant)
        </StyledPay>
        <StyledBtn>
          <Modal>
            <Modal.Open opens="pay">
              <Button>Add Payment</Button>
            </Modal.Open>
            <Modal.Window name="pay">
              <div>
                <Form onSubmit={handleSubmit}>
                  <FormRow label="Phone Number">
                    <Input
                      type="number"
                      onChange={(e) => setPhoneNum(e.target.value)}
                    />
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
                    />
                  </FormRow>
                  <FormRow label="Payment name">
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
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

export default CurrentOrder
