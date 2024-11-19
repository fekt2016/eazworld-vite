import { useState } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import { devicesMax } from "../styles/breakpoint";

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

    transform: translate(-23%, -50%);
  }
`;
const AlertContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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
  // setTimeout(() => {
  //   setShowAlert(false)
  // }, 5000)
  return (
    showAlert && (
      <StyledAlert className="">
        <Close onClick={closeAlert} />
        <AlertContainer>
          <h1>Coming soon!!!</h1>
        </AlertContainer>
      </StyledAlert>
    )
  );
}

export default Alert;
