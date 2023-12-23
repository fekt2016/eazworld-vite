import styled, { css } from 'styled-components'
import Heading from '../../ui/Heading'
import StyledSection from './Section'
import { useInView } from 'react-intersection-observer'

const StyledSafe = styled.div`
  opacity: 0;
  visibility: hidden;
  transform: translateY(200%);
  transition: all 3s;
  ${(props) =>
    props.inView &&
    css`
      transform: translateY(0);
      visibility: visible;
      opacity: 1;
    `}
`
function Safe() {
  const { ref: safeRef, inView } = useInView()
  return (
    <StyledSection type="safe" ref={safeRef}>
      <StyledSafe inView={inView}>
        <Heading as="h2">A safe place to buy & sell crypto</Heading>
        We’re focused on providing innovative security solutions to protect your
        assets.
      </StyledSafe>
    </StyledSection>
  )
}
export default Safe
