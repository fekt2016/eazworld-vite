/* eslint react/prop-types: 0 */
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledItem = styled.li`
  padding: 1rem;
  background-color: var(--color-white);
  box-shadow: 0 2px 5px rgba(0, 70, 225, 0.26);
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const StyledIma = styled.img`
  height: 4.5rem;
  width: 4.5rem;
`
const StyledNavSell = styled(NavLink)`
  text-decoration: none;
  font-size: 1.6rem;
  text-transform: capitalize;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  background-color: rgba(242, 169, 0, 0.1);
  color: var(--color-sec-900);
`
const StyledNavBuy = styled(NavLink)`
  text-decoration: none;
  font-size: 1.6rem;
  text-transform: capitalize;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--color-black-0);
`
const StyledName = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-around;
  font-size: 1.6rem;
  text-transform: capitalize;
`
const StyledCur = styled.span`
  font-size: 2rem;
  font-weight: 500;
  font-family: 'roboto', Arial, Helvetica, sans-serif;
  color: #f2a900;
`

const StyledPer = styled.span`
  color: #00b26b;
  font-size: 1.8rem;
`

function RateItem({ cryp }) {
  return (
    <StyledItem>
      <StyledHeader>
        <StyledIma src={cryp.image} alt={cryp.id} />
        <StyledNavBuy href="/">buy</StyledNavBuy>
        <StyledNavSell href="/">sell</StyledNavSell>
      </StyledHeader>
      <StyledName>
        <StyledCur>{cryp.symbol}</StyledCur>
        <span>{cryp.name}</span>
      </StyledName>
      <StyledName>
        <span>{`$${cryp.current_price.toFixed(2)}`}</span>
        <StyledPer>{`${cryp.price_change_percentage_24h.toFixed(
          2,
        )}%`}</StyledPer>
      </StyledName>
    </StyledItem>
  )
}

export default RateItem
