import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import { devicesMax } from "../styles/breakpoint";
import Heading from "./Heading";

const StyledAlert = styled.div`
  width: 50%;
  height: 50rem;
  background-color: var(--color-gold-900);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border: 1px solid var(--color-red-700);
  border-radius: 7px;
  z-index: 1000;
  ${(props) => props.className}
  transition: all .4s;

  @media ${devicesMax.sm} {
    width: 70%;
    height: 30rem;

    transform: translate(-50%, -50%);
  }
`;
const AlertContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const Close = styled(FaWindowClose)`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  font-size: 3rem;
  cursor: pointer;
  fill: var(--color-red-700);
`;
function Alert() {
  const [showAlert, setShowAlert] = useState(true);
  const closeAlert = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 10000);
  }, []);
  return (
    showAlert && (
      <StyledAlert className="">
        <Close onClick={closeAlert} />
        <AlertContainer>
        <Heading as="h3">Points program is coming soon.</Heading>
          <ul>
            
            <li>The program will in this way.</li>
            <li>$1 is equivelet to 0.67point of any order a customer place </li>
            <li>a refered customer will gain 20 point anytime he has been refered</li>
            <li>there is customers membership level as fellows(rookie member,Silver member, gold member and a platinum member </li>
            <li>When you first register for a membership, you become a rookie member who has no discount price </li>
            <li>you will become a silver member after you have aquired 1000point from orders you place and when customers refered you when they signup.</li>
            <li>You become Gold Member after you had 2000points</li>
            <li>You become platinum after you have 50000points</li>
          </ul>
          
        </AlertContainer>
      </StyledAlert>
    )
  );
}

export default Alert;
