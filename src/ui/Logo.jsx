/* eslint react/prop-types: 0 */
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;

  ${(props) =>
    props.type === "nav" &&
    css`
      border-radius: 50%;
    `}
`;

const Img = styled.img`
  ${(props) =>
    props.sizes === "small" &&
    css`
      height: 10rem;
    `}
  ${(props) =>
    props.sizes === "big" &&
    css`
      height: 20rem;
    `}
    ${(props) =>
    props.sizes === "medium" &&
    css`
      height: 15rem;
    `}
`;

function Logo({ type, img, sizes }) {
  return (
    <StyledLogo type={type}>
      <Link to="/">
        <Img src={img} alt="Logo" sizes={sizes} />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
