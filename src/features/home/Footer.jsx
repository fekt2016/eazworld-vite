import { styled } from 'styled-components'
import { devicesMax } from '../../styles/breakpoint'

import { BsWhatsapp, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs'

const StyledFooter = styled.footer`
  padding: 4rem;

  border-top: 1px solid var(--color-grey-200);

  display: flex;
  justify-content: space-between;
  @media ${devicesMax.md} {
    flex-direction: column;
  }
`
const Imag = styled.img`
  height: 10rem;
`
const AsideLogo = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-basis: 20%;
`
const LinkAside = styled.aside`
  flex: 2;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media ${devicesMax.md} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }
`
const Media = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: space-around;
`
const H4 = styled.h4`
  color: var(--color-primary-900);
`

const StyledUl = styled.ul`
  list-style: none;
`
const P = styled.p`
  font-size: 1.2rem;
`
function Footer() {
  return (
    <StyledFooter>
      <AsideLogo>
        <Imag src="/logo.png" alt="footer-log" />
        <Media>
          <BsWhatsapp />
          <BsTwitter />
          <BsInstagram />
          <BsFacebook />
        </Media>
        <P>&#169; 2023 EazWorld</P>
      </AsideLogo>
      <LinkAside>
        <div>
          <H4>Product</H4>
          <StyledUl>
            <li>Explorer</li>
            <li>pay</li>
            <li>Card</li>
            <li>Rate</li>
          </StyledUl>
        </div>
        <div>
          <H4>Compnay</H4>
          <StyledUl>
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Ventures</li>
          </StyledUl>
        </div>
        <div>
          <H4>Partner</H4>
          <StyledUl>
            <li>Kardaclan</li>
          </StyledUl>
        </div>
        <div>
          <H4>Support</H4>
          <StyledUl>
            <li>Support Center</li>
            <li>Contact us</li>
            <li>system status</li>
            <li>Legal Agreement</li>
          </StyledUl>
        </div>
      </LinkAside>
    </StyledFooter>
  )
}

export default Footer
