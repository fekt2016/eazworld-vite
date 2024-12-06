import { styled } from "styled-components";
import { devicesMax } from "../../styles/breakpoint";

import { BsWhatsapp, BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const StyledFooter = styled.footer`
  padding: 5rem 0 10rem 0;
  border-top: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-900);
  display: flex;
  justify-content: space-between;
  @media ${devicesMax.md} {
    flex-direction: column;
    text-align: center;
  }
`;
const Imag = styled.img`
  height: 10rem;
`;
const AsideLogo = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-basis: 20%;
`;
const LinkAside = styled.aside`
  flex: 2;

  display: flex;
  justify-content: space-around;
  align-items: start;

  @media ${devicesMax.md} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }
`;
const Col = styled.div`
  @media ${devicesMax.md} {
    text-align: center;
  }
`;
const Media = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: space-around;
`;
const H4 = styled.h4`
  color: var(--color-gold-900);
  font-weight: 900;
  font-size: 2rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  color: var(--color-white-0);
  display: flex;
  flex-direction: column;
`;
const Li = styled.li`
  font-size: 1.6rem;
  padding: 1rem 0;
`;
const P = styled.p`
  font-size: 1.2rem;

  @media ${devicesMax.md} {
    display: none;
  }
`;
const Ps = styled.p`
  display: none;
  display: none @media ${devicesMax.md} {
    display: block;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <AsideLogo>
        <Imag src="/2.png" alt="footer-log" />
        <Media>
          <BsWhatsapp fill="var(--color-whatsapp-700)" fontSize={24} />
          <BsTwitter fill="var(--color-twitter-900)" fontSize={24} />
          <BsInstagram fill="#FFDC80" fontSize={24} />
          <BsFacebook fill="var(--color-facebook)" fontSize={24} />
        </Media>
        <P>&#169; 2023 EazWorld</P>
      </AsideLogo>
      <LinkAside>
        <Col>
          <H4>Product</H4>
          <StyledUl>
            <Li>Explorer</Li>
            <Li>pay</Li>
            <Li>Card</Li>
            <Li>Rate</Li>
          </StyledUl>
        </Col>
        <Col>
          <H4>Compnay</H4>
          <StyledUl>
            <Li>About</Li>
            <Li>Careers</Li>
            <Li>Blog</Li>
            <Li>Ventures</Li>
          </StyledUl>
        </Col>
        <Col>
          <H4>Partner</H4>
          <StyledUl>
            <Li>Kardaclan</Li>
          </StyledUl>
        </Col>
        <Col>
          <H4>Support</H4>
          <StyledUl>
            <Li>Support Center</Li>
            <Li>Contact us</Li>
            <Li>system status</Li>
            <Li>
              <Link to={"/legal"}>Legal Agreement</Link>
            </Li>
          </StyledUl>
        </Col>
      </LinkAside>
      <Ps>&#169; 2023 EazWorld</Ps>
    </StyledFooter>
  );
}

export default Footer;
