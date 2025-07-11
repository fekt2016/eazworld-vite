import styled, { keyframes } from "styled-components";

// Define the rotation animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled Spinner Component
const Spinner = styled.div`
  display: inline-block;
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border: 4px solid ${(props) => props.color || "#007bff"};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${rotate} ${(props) => props.speed || "0.8s"} linear infinite;
`;

// Wrapper for Accessibility
const LoadingSpinner = ({ size, color }) => {
  return <Spinner role="status" aria-live="polite" size={size} color={color} />;
};

export default LoadingSpinner;
