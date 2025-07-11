// import { Link } from "react-router-dom";
// import { FaFacebook, FaApple } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";

// export default function Register() {
//   const [state, setState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     number: "",
//     passwordConfirm: "",
//     check: false,
//   });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(state);
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={submitHandler}>
//         <div>
//           <label htmlFor="name">name</label>
//           <input
//             type="name"
//             id="name"
//             name="name"
//             value={state.name}
//             onChange={(e) => setState({ ...state, name: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={state.email}
//             onChange={(e) => setState({ ...state, email: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={state.password}
//             onChange={(e) => setState({ ...state, password: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="passwordConfirm">passwordConfirm</label>
//           <input
//             type="password"
//             id="passwordConfirm"
//             name="passwordConfirm"
//             value={state.passwordConfirm}
//             onChange={(e) =>
//               setState({ ...state, passwordConfirm: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="Number">phone Number</label>
//           <input
//             type="Number"
//             id="Number"
//             name="Number"
//             value={state.number}
//             onChange={(e) => setState({ ...state, number: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             id="check"
//             name="check"
//             onChange={(e) => setState({ ...state, check: e.target.checked })}
//             required
//           />
//           <label htmlFor="check">I agree with the privacy policy & terms</label>
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an Account <Link to="/login">Click here</Link> to login
//       </p>
//       <div>
//         <div></div>
//         <p>or</p>
//         <div></div>
//       </div>
//       <div>
//         <FaFacebook />
//         <FcGoogle />
//         <FaApple />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaFacebook, FaApple, FaCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    passwordConfirm: "",
    check: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simple validation
    if (state.password !== state.passwordConfirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!state.check) {
      setError("You must agree to the privacy policy & terms");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration data:", state);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <Logo>YourBrand</Logo>
          <h1>Create Your Account</h1>
          <Subtitle>Join us today for an amazing shopping experience</Subtitle>
        </RegisterHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <RegisterForm onSubmit={submitHandler}>
          <FormRow>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 1 }}>
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
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="Number">Phone Number</Label>
              <Input
                type="tel"
                id="Number"
                name="Number"
                value={state.number}
                onChange={(e) => setState({ ...state, number: e.target.value })}
                placeholder="(123) 456-7890"
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                placeholder="••••••••"
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={state.passwordConfirm}
                onChange={(e) =>
                  setState({ ...state, passwordConfirm: e.target.value })
                }
                placeholder="••••••••"
                required
              />
            </FormGroup>
          </FormRow>

          <TermsGroup>
            <CheckboxContainer>
              <HiddenCheckbox
                id="check"
                name="check"
                checked={state.check}
                onChange={(e) =>
                  setState({ ...state, check: e.target.checked })
                }
                required
              />
              <StyledCheckbox $checked={state.check}>
                <FaCheck size={10} color="white" />
              </StyledCheckbox>
            </CheckboxContainer>
            <TermsLabel htmlFor="check">
              I agree with the{" "}
              <TermsLink to="/terms">privacy policy & terms</TermsLink>
            </TermsLabel>
          </TermsGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Create Account"}
          </SubmitButton>
        </RegisterForm>

        <Divider>
          <DividerLine />
          <DividerText>or sign up with</DividerText>
          <DividerLine />
        </Divider>

        <SocialButtons>
          <SocialButton $bg="#3b5998" $hover="#344e86">
            <FaFacebook color="white" size={20} />
            Facebook
          </SocialButton>
          <SocialButton $bg="#fff" $hover="#f5f5f5" $border="#e0e0e0">
            <FcGoogle size={20} />
            Google
          </SocialButton>
          <SocialButton $bg="#000" $hover="#333">
            <FaApple color="white" size={20} />
            Apple
          </SocialButton>
        </SocialButtons>

        <LoginSection>
          <LoginText>Already have an account?</LoginText>
          <LoginLink to="/login">Sign in</LoginLink>
        </LoginSection>
      </RegisterCard>
    </RegisterContainer>
  );
}

// Styled Components (some reused from login, with additions)
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 40px;
`;

const RegisterHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;

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

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
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

const TermsGroup = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 5px;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  width: 18px;
  height: 18px;
  background: ${(props) => (props.$checked ? "#4e73df" : "white")};
  border: 1px solid ${(props) => (props.$checked ? "#4e73df" : "#e0e0e0")};
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    visibility: ${(props) => (props.$checked ? "visible" : "hidden")};
  }
`;

const TermsLabel = styled.label`
  font-size: 14px;
  color: #495057;
  cursor: pointer;
  flex: 1;
`;

const TermsLink = styled(Link)`
  color: #4e73df;
  text-decoration: none;

  &:hover {
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
  margin-top: 10px;

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #eaeaea;
`;

const DividerText = styled.span`
  padding: 0 15px;
  color: #6c757d;
  font-size: 14px;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: ${(props) => (props.$border ? `1px solid ${props.$border}` : "none")};
  background: ${(props) => props.$bg || "#fff"};
  color: ${(props) =>
    props.$bg === "#000" || props.$bg === "#3b5998" ? "white" : "#333"};

  &:hover {
    background: ${(props) => props.$hover || "#f5f5f5"};
  }
`;

const LoginSection = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
`;

const LoginText = styled.span`
  color: #6c757d;
  font-size: 14px;
  margin-right: 8px;
`;

const LoginLink = styled(Link)`
  color: #4e73df;
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
