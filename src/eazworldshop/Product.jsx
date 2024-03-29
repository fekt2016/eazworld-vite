import styled, { keyframes } from 'styled-components'

const arrivalAnimation = keyframes`
  0%{ transform: translateX(-1500px)}
  100%{ transform: translateX(600px)}
`

const StyledContainer = styled.div`
  padding: 2rem;
  margin-top: 4rem;
`
const ProContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--color-grey-200);
`

const ProList = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  animation-name: ${arrivalAnimation};
  animation-duration: 60s;
  animation-iteration-count: infinite;
`
const Card = styled.div`
  height: 20rem;
  border-radius: 10px;
  flex: 1;
  box-shadow: var(--shadow-lg);
  background-image: ${(props) => `url(${props.background})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem;
`
function Product() {
  return (
    <StyledContainer>
      <ProContent>
        <h3>appeals</h3>
        <ProList>
          <Card background={'../../public/image3.jpg'}>woman new arrival</Card>
          <Card background={'../../public/images1.jpg'}>product 2</Card>
          <Card>product 3</Card>
          <Card>product 4</Card>
          <Card>product 5</Card>
        </ProList>
      </ProContent>
    </StyledContainer>
  )
}

export default Product
