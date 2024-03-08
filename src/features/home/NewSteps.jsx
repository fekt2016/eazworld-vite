import { styled, css } from 'styled-components'
import Heading from '../../ui/Heading'
import { HiMiniArchiveBoxArrowDown, HiHandThumbUp } from 'react-icons/hi2'
import { BsSendCheckFill } from 'react-icons/bs'
import Img from '../../ui/Img'
import { devicesMax } from '../../styles/breakpoint'
import { useInView } from 'react-intersection-observer'

const Step = styled.div`
  max-width: 70%;
  margin: 0 auto;
  height: 80rem;

  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const StepContainer = styled.div`
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  color: var(--color-white-0);
  position: relative;
  text-transform: capitalize;
  transition: all 3s;
  opacity: 0;
  transition-delay: 1s;

  display: flex;
  justify-content: center;
  align-items: center;


  ${(props) =>
    props.type === 'create' &&
    css`
      background-color: red;
      grid-column-start: 1;
      grid-column-end: 2;
      background-image: linear-gradient(to bottom right, #662d8c, #ed1e79);
      transform: scale(0.5);

      ${(props) =>
        props.inview &&
        css`
          transform: scale(1);
          opacity: 1;
        `}
    `}
    ${(props) =>
      props.type === 'place' &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
        background-image: url('../../../back.jpeg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform: translateY(50%);

        ${(props) =>
          props.inview &&
          css`
            transform: translateY(0);
            opacity: 1;
          `}
      `}
      ${(props) =>
        props.type === 'send' &&
        css`
          width: 10rem;
          background-image: linear-gradient(to bottom right, #a1c4fd, #c2e9fb);
          grid-column-start: 1;
          grid-column-end: -1;


            ${(props) =>
              props.inview &&
              css`
                width: 100%;
                opacity: 1;
              `}
            @media
            ${devicesMax.dm} {
            display: flex;
            flex-direction: column;
          }
        `}
        ${(props) =>
          props.type === 'order' &&
          css`
            background-image: linear-gradient(
              to bottom right,
              #2e3192,
              #1bffff
            );
            transform: scale(1.5);

            ${(props) =>
              props.inView &&
              css`
                transform: scale(1);
                opacity: 1;
              `}
          `}
`
const IconContainer = styled.div`
  background-color: var(--color-white-0);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
`
const IconStyles = css`
  font-size: 2.5rem;
  color: #000;
`
const AccountTree = styled(BsSendCheckFill)`
  ${IconStyles}
`
const BoxArrowDown = styled(HiMiniArchiveBoxArrowDown)`
  ${IconStyles}
`
const ThumbUp = styled(HiHandThumbUp)`
  ${IconStyles}
`
const CheckFill = styled(BsSendCheckFill)`
  ${IconStyles}
`

const PayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
const ImgStyles = {
  boxShadow: '0 1px 2px #000',
  borderRadius: '50%',
}
function NewSteps() {
  const { ref: stepRef, inView } = useInView()
  return (
    <Step ref={stepRef}>
      <StepContainer inview={inView} type="create">
        <Heading as="h2">create an account</Heading>
        <IconContainer>
          <AccountTree />
        </IconContainer>
      </StepContainer>
      <StepContainer inview={inView} type="place">
        <Heading as="h2">place an order</Heading>
        <IconContainer>
          <BoxArrowDown />
        </IconContainer>
      </StepContainer>
      <StepContainer inview={inView} type="order">
        <Heading as="h2">Complete an order</Heading>
        <IconContainer>
          <ThumbUp />
        </IconContainer>
      </StepContainer>
      <StepContainer inview={inView} type="send">
        <Heading as="h2">send payment</Heading>
        <IconContainer>
          <CheckFill />
        </IconContainer>
        <PayContainer>
          <Img src="../../../mtn.png" style={ImgStyles} />
          <Img src="../../../airtel.png" style={ImgStyles} />
          <Img src="../../../GTBank_logo.svg.png" style={ImgStyles} />
          <Img src="../../../ecobank.png" style={ImgStyles} />
        </PayContainer>
      </StepContainer>
    </Step>
  )
}

export default NewSteps
