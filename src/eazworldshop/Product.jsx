import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: 2rem;
  margin-top: 4rem;
`
const ProContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ProList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

function Product() {
  return (
    <StyledContainer>
      <ProContent>
        <h3>appeals</h3>
        <ProList>
          <div>
            <img src="" alt="" />
          </div>
          <div>product 2</div>
          <div>product 3</div>
          <div>product 4</div>
          <div>product 5</div>
        </ProList>
      </ProContent>
    </StyledContainer>
  )
}

export default Product
