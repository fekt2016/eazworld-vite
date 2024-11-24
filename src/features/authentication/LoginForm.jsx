import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLogin } from "./useLogin";

import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import { devicesMax } from "../../styles/breakpoint";

const StyledBtn = styled(NavLink)`
  padding: 0.5rem 1.5rem;
  color: var(--color-brand-900);
  &:hover {
    text-decoration-line: underline;
  }
`;
const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
`;
const PassSpan = styled.span`
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 1000;
  cursor: pointer;

  // @media ${devicesMax.md} {
  //   top: 60px;
  //   right: 20px;
  // }
`;
const SignupBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const EyeHandler = styled.div`
  position: relative;
  flex-basis: 53rem;

  @media ${devicesMax.md} {
    flex-basis: auto;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form type="login" onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password">
        <EyeHandler>
          <Input
            type={visible ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <PassSpan onClick={() => setVisible((s) => !s)}>
            {visible ? <HiMiniEye /> : <HiMiniEyeSlash />}
          </PassSpan>
        </EyeHandler>
      </FormRow>
      <FormRow>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRow>
      <StyledFooter>
        <StyledBtn to="/recover-password" disabled={isLoading}>
          Forget password
        </StyledBtn>
        <SignupBox>
          <p>New to eazworld ? </p>
          <StyledBtn to="/signup" disabled={isLoading}>
            Sign Up
          </StyledBtn>
        </SignupBox>
      </StyledFooter>
    </Form>
  );
}

export default LoginForm;
