import { styled } from 'styled-components'
import Button from '../../ui/Button'
import { devicesMax } from '../../styles/breakpoint'

import Heading from '../../ui/Heading'
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  margin-bottom: 4rem;

  height: 70vh;
  display: flex;

  align-items: center;
`
const StyledRight = styled.div`
  flex: 1;
  background-image: url('/Crypto2.png');
  background-position: center;
  /* background-repeat: no-repeat; */
  background-size: cover;
  height: 100%;

  @media ${devicesMax.sm} {
    display: none;
  }
`

const StyledText = styled.div`
  height: 100%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  flex: 1;
`
const StyledPBox = styled.div`
  padding: 2rem;
`
const StyledP = styled.p`
  margin-bottom: 4rem;
  color: var(--color-primary-500);
`
function Header() {
  return (
    <StyledHeader>
      <StyledText>
        <Heading as="h1">buy bitcoin & other crypto currency</Heading>
        <StyledPBox>
          <StyledP>
            Start Your Order With Just $10 In Less Than 10minutes
          </StyledP>
          <Button variation="primary" size="medium">
            <NavLink to="/login">Get Started With $10</NavLink>
          </Button>
        </StyledPBox>
      </StyledText>
      <StyledRight />
    </StyledHeader>
  )
}

export default Header
