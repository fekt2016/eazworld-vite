import { styled } from "styled-components";
import Button from "../../ui/Button";
// import { devicesMax } from "../../styles/breakpoint";

import Heading from "../../ui/Heading";
import { NavLink } from "react-router-dom";
import { devicesMax } from "../../styles/breakpoint";

const StyledHeader = styled.header`
  background-color: var(--color-grey-900);

  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devicesMax.md} {
    height: 50rem;
  }
`;

const StyledText = styled.div`
  height: 100%;

  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
`;
const StyledPBox = styled.div`
  padding: 2rem;
`;
const StyledP = styled.p`
  margin-bottom: 2rem;
  color: var(--color-primary-500);
`;
function Header() {
  return (
    <StyledHeader>
      <StyledText>
        <Heading as="homeh1">
          buy bitcoin <br />& other crypto currency
        </Heading>
        <StyledPBox>
          <StyledP>
            Start Your Order With Just $10 In Less Than 10minutes
          </StyledP>
          <Button variation="primary" size="medium">
            <NavLink to="/login">Get Started With $10</NavLink>
          </Button>
        </StyledPBox>
      </StyledText>
      {/* <StyledRight /> */}
    </StyledHeader>
  );
}

export default Header;
