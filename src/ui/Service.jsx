import { styled, css } from 'styled-components'
import StyledSection from '../features/home/Section'
import {
  HiMiniTruck,
  HiMiniShieldCheck,
  HiMiniCursorArrowRays,
} from 'react-icons/hi2'
import { devicesMax } from '../styles/breakpoint'
import { useInView } from 'react-intersection-observer'

const H2 = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;

    ${(props) =>
      props.type === 'yellow' &&
      css`
        color: var(--color-sec-700);
      `}
    ${(props) =>
      props.type === 'green' &&
      css`
        color: var(--color-green-700);
      `}
    ${(props) =>
      props.type === 'indigo' &&
      css`
        color: var(--color-indigo-700);
      `}
    @media
    ${devicesMax.lg} {
    font-size: 1.6rem;
  }
`

const StyledCard = styled.div`
  padding: 4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  text-align: center;
  background-color: var(--color-black-100);
  transition: all .8s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devicesMax.lg} {
    padding: 2rem;
  }

  ${(props) =>
    props.type === 'security' &&
    css`
      transform: translateX(-500px);
      ${(props) =>
        props.inview &&
        css`
          transform: translateX(0);
        `}
    `}
  ${(props) =>
    props.type === 'auto' &&
    css`
      opacity: 0;
      transform: scale(0.5);
      ${(props) =>
        props.inview &&
        css`
          opacity: 1;
          transform: scale(1);
        `}
    `}
  ${(props) =>
    props.type === 'secure' &&
    css`
      transform: translateX(500px);
      ${(props) =>
        props.inview &&
        css`
          transform: translateX(0);
        `}
    `}
`
const StyledIconBox = styled.div`
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  background-color: var(--color-primary-200);
  height: 10rem;
  width: 10rem;
  margin-bottom: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledIcon1 = styled(HiMiniTruck)`
  font-size: 50px;
  fill: var(--color-green-700);
`
const StyledIcon2 = styled(HiMiniCursorArrowRays)`
  font-size: 50px;
  fill: var(--color-sec-700);
`
const StyledIcon3 = styled(HiMiniShieldCheck)`
  font-size: 50px;
  fill: var(--color-indigo-700);
`

function Service() {
  const { ref: stepRef, inView } = useInView()
  return (
    <StyledSection ref={stepRef} type="service">
      <StyledCard inview={inView} type="security">
        <StyledIconBox>
          <StyledIcon1 />
        </StyledIconBox>
        <H2 type="green">Security</H2>
        <p>All your information is securely with eazworld</p>
      </StyledCard>
      <StyledCard inview={inView} type="auto">
        <StyledIconBox>
          <StyledIcon2 />
        </StyledIconBox>
        <H2 type="yellow">Automated Service</H2>
        <p> 24/7 Selling And Buying Crypto Easier In Few Munites</p>
      </StyledCard>
      <StyledCard inview={inView} type="secure">
        <StyledIconBox>
          <StyledIcon3 />
        </StyledIconBox>
        <H2 type="indigo">Secure Payment</H2>
        <p>Mobile Money Payment Makes It A Secure Way To Process Your Order</p>
      </StyledCard>
    </StyledSection>
  )
}

export default Service
