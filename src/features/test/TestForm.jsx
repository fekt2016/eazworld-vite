import styled from 'styled-components'
// import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'

import Heading from '../../ui/Heading'
import Form from '../../ui/Form'
import Textarea from '../../ui/Textarea'
import Button from '../../ui/Button'
import { useCreateTest } from './useTestCreate'
import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import { useState } from 'react'
import CloseIcon from '../../ui/CloseIcon'
import { devicesMax } from '../../styles/breakpoint'

const StyledTest = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  position: relative;

  background-color: var(--color-blue-100);
`
const HeadingBox = styled.div`
  margin-bottom: 2rem;
`
const TextBox = styled.div`
  margin-top: 2rem;

  @media ${devicesMax.sm} {
    font-size: 1.3rem;
  }
`
const List = styled.ul`
  list-style: lower-roman;
  padding: 2rem;
`

function TestForm({ fullName }) {
  const [close, setClose] = useState(false)
  const { createTest, isCreating } = useCreateTest()
  const { register, handleSubmit, reset } = useForm()

  function onSubmit(data) {
    console.log(data)
    createTest({ ...data })
    reset()
  }

  if (close === false)
    return (
      <StyledTest>
        <CloseIcon onClick={() => setClose(true)} />
        <HeadingBox>
          <Heading as="h4">submit a testimonial</Heading>
        </HeadingBox>
        <Form type="test" onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Textarea
              placeholder="testimonal message"
              {...register('msg', {
                required: 'msg is required',
              })}
            />
          </FormRow>
          <FormRow>
            <Input
              type="text"
              placeholder="Your location"
              {...register('loc', {
                required: 'loc is required',
              })}
            />
          </FormRow>
          <Input
            type="hidden"
            {...register('fullName')}
            defaultValue={fullName}
          />
          <FormRow>
            <Button disabled={isCreating}>Submit</Button>
          </FormRow>
        </Form>
        <TextBox>
          <Heading>Payment instruction below:</Heading>
          <p>
            You will send the total to pay amount to the Merchant number:
            0542011274(easyworldpc).
          </p>
          <p>how to send money using MTN Mobile money shortcode(subscriber)</p>
          <List>
            <li>Dial *170# </li>
            <li>Select transfer money</li>
            <li>
              Select Momo user(that is if the person is registered om mobile
              money.
            </li>
            <li>
              Enter the mobile money number(0542011274 easyworldpc) and repeat
              again.
            </li>
            <li>Enter the amount you want to send.</li>
            <li>
              Type in your reference(Dont type anything related to crypto)
            </li>
            <li>
              Confirm and send money. Click on the `Add Payment&rsquo; in the
              order history or the order detail page. Check the SMS confirmation
              message you will receive from MTN it contains the Transaction ID.
            </li>
          </List>
        </TextBox>
      </StyledTest>
    )
}

export default TestForm
