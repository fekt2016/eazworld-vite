import styled from 'styled-components'

const StyledPhoto = styled.div`
  height: 50rem;
  background-image: url('../../public/phone .avif');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--color-black);
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

function Photoslider() {
  return (
    <StyledPhoto>
      <div>
        <h1>eazworld</h1>
        <p>shopping with style</p>
      </div>
    </StyledPhoto>
  )
}

export default Photoslider
