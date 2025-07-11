import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/auth/useAuth";
import { useSyncWishlist } from "../../hooks/useWishlist";
import { useCartActions } from "../../hooks/useCart";

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { sync, isSyncing } = useSyncWishlist();
  const { syncCart } = useCartActions();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { login } = useAuth();
  // const syncCart = useSyncCart();

  const submitHandler = (e) => {
    e.preventDefault();

    try {
      const user = login.mutate(state, {
        onSuccess: () => {
          setState({ email: "", password: "" });
        },
      });
      if (user) {
        console.log("User logged in:");
        sync.sync();
        syncCart();
      }

      navigate("/");
    } catch (err) {
      console.log("Invalid email or password. Please try again.");
      console.log(err.message);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <Logo>YourBrand</Logo>
          <h1>Welcome Back</h1>
          <Subtitle>Enter your credentials to access your account</Subtitle>
        </LoginHeader>

        {login.error && <ErrorMessage>{login.error}</ErrorMessage>}

        <LoginForm onSubmit={submitHandler}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          <ForgotPassword to="/forgot-password">
            Forgot password?
          </ForgotPassword>

          <SubmitButton type="submit" disabled={login.isLoading}>
            {login.isLoading || isSyncing ? <Spinner /> : "Sign In"}
          </SubmitButton>
        </LoginForm>

        <SignupSection>
          <SignupText>Dont have an account?</SignupText>
          <SignupLink to="/register">Create account</SignupLink>
        </SignupSection>

        <AdminLoginLink to="/admin/login">
          Login as Administrator
        </AdminLoginLink>
      </LoginCard>
    </LoginContainer>
  );
}

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  padding: 40px;
  text-align: center;
`;

const LoginHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    color: #333;
    margin: 16px 0 8px;
  }
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #4e73df;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #6c757d;
  font-size: 15px;
  margin-top: 8px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 14px;
  color: #4e73df;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #2e59d9;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  background: #4e73df;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #2e59d9;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const SignupSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const SignupText = styled.span`
  color: #6c757d;
  font-size: 14px;
`;

const SignupLink = styled(Link)`
  color: #4e73df;
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminLoginLink = styled(Link)`
  display: block;
  margin-top: 24px;
  color: #6c757d;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #4e73df;
    text-decoration: underline;
  }
`;
