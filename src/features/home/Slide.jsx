/* eslint react/prop-types : 0*/
import { styled } from 'styled-components'
import Heading from '../../ui/heading'

const StyledText = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const StyledMsg = styled.div`
  width: 60%;
  text-align: center;
`
const StyledImg = styled.img`
  height: 6rem;
  width: 6rem;

  border-radius: var(--Border-radius-cir);
`
const StyledName = styled.div``
function Testimonial({ name, location, msg, img }) {
  return (
    <StyledText>
      <StyledMsg>
        <p>&quot;</p>
        <p>{msg}</p>
      </StyledMsg>
      <div>
        <StyledImg src={img} alt={name} />
      </div>
      <StyledName>
        <Heading as="h4">{name}</Heading>
      </StyledName>
      <div>{location}</div>
    </StyledText>
  )
}

export default Testimonial
