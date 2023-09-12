import { styled } from 'styled-components'
import {
  HiOutlineUserCircle,
  HiOutlineBanknotes,
  HiOutlineShoppingCart,
  HiOutlineCheckCircle,
} from 'react-icons/hi2'
import { devicesMax } from '../../styles/breakpoint'

const StyledStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledLeft = styled.aside`
  flex: 1;
  @media ${devicesMax.sm} {
    display: none;
  }
`
const StyledRight = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media ${devicesMax.sm} {
    background-image: url('/Credit.png');
    background-position: center;
    background-size: cover;
  }
`

const StyledBox = styled.div`
  border: 2px solid var(--color-primary-700);
  border-radius: var(--border-radius-lg);
  text-transform: capitalize;
  padding: 2rem 4rem;
  margin: 1rem;
  box-shadow: 1px 1px 2px 1px #000;

  display: flex;

  justify-content: space-between;
  align-items: center;
  @media ${devicesMax.sm} {
    background-color: var(--color-white-0);
  }
`
const StyledIcon1 = styled(HiOutlineUserCircle)`
  font-size: 5rem;
  color: var(--color-black-0);
`
const StyledIcon2 = styled(HiOutlineShoppingCart)`
  font-size: 5rem;
  color: var(--color-black-0);
`
const StyledIcon3 = styled(HiOutlineBanknotes)`
  font-size: 5rem;
  color: var(--color-black-0);
`
const StyledIcon4 = styled(HiOutlineCheckCircle)`
  font-size: 5rem;
  color: var(--color-black-0);
`

function Step() {
  return (
    <StyledStep>
      <StyledRight>
        <StyledBox>
          <p>sign up for an account</p>
          <StyledIcon1 />
        </StyledBox>
        <StyledBox>
          <p>place an order</p>
          <StyledIcon2 />
        </StyledBox>
        <StyledBox>
          <p> send momo as payment</p>
          <StyledIcon3 />
        </StyledBox>
        <StyledBox>
          <p>order will complete in a munite</p>
          <StyledIcon4 />
        </StyledBox>
      </StyledRight>
      <StyledLeft>
        <img src="/Credit.png" />
      </StyledLeft>
    </StyledStep>
  )
}

export default Step
