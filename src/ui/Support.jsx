import styled from 'styled-components'

const Content = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  align-items: center;
`
const H4 = styled.h4`
  font-size: 3rem;
  text-transform: capitalize;
  margin-bottom: 2rem;
`
const StyledUl = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const H6 = styled.h6`
  font-size: 1.6rem;
  color: var(--color-sec-800);
  text-transform: capitalize;
`

function Support() {
  return (
    <>
      <Content>
        <H4>support</H4>
        <StyledUl>
          <StyledLi>
            <H6>Getting Started</H6>
            <p>-Sign up </p>
            <p>-login</p>
          </StyledLi>
          <StyledLi>
            <H6>2-factor auth</H6>
            <p>-password </p>
            <p>-security</p>
          </StyledLi>
          <StyledLi>
            <H6>wallets</H6>
            <p>-bitcoin </p>
            <p>-tether</p>
          </StyledLi>
          <StyledLi>
            <H6>momo payment</H6>
            <p>mtn momo</p>
            <p>vodafone cash</p>
          </StyledLi>
          <StyledLi>
            <H6>Updates</H6>
            <p>-system info</p>
            <p>-app</p>
          </StyledLi>
        </StyledUl>
      </Content>
    </>
  )
}

export default Support
