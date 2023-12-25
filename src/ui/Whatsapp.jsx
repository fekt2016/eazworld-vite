import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaWhatsappSquare } from 'react-icons/fa'

const Container = styled.div`
  position: fixed;
  right: 2px;
  bottom: 2px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
`
const Icon = styled(FaWhatsappSquare)`
  font-size: 4rem;
  color: var(--color-whatsapp-100);
  box-shadow: var(--shadow-md);
`

const StyledLink = styled(Link)``

const Span = styled.span`
  color: var(--color-whatsapp-700);
  opacity: 0;
  transform: rotateZ(20deg) translateY(10px);
  transition: all 0.8s;

  ${StyledLink}:hover ~ & {
    opacity: 1;
    transform: translateY(0);
  }
`

function Whatsapp() {
  return (
    <Container>
      <StyledLink to="https://wa.me/233235222207">
        <Icon />
      </StyledLink>
      <Span>Contact Us</Span>
    </Container>
  )
}

export default Whatsapp
