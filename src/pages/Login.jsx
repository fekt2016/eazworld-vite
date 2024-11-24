import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { devicesMax } from "../styles/breakpoint";

const LoginLayout = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  // padding-top: 20rem;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-900);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white-0);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 7px;
  width: 40%;

  @media ${devicesMax.lg} {
    width: 50%;
    padding: 1rem;
  }
  @media ${devicesMax.md} {
    width: 50%;
  }
  @media ${devicesMax.sm} {
    width: 80%;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Container>
        <Logo img="../../4.png" type="login" sizes="big" />
        <Heading as="h1">welcome back</Heading>
        <LoginForm />
      </Container>
    </LoginLayout>
  );
}

export default Login;
