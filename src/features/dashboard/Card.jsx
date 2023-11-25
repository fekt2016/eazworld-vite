/* eslint react/prop-types: 0 */

import { styled, css } from 'styled-components'

import Button from '../../ui/Button'
import Heading from '../../ui/Heading'
import { devicesMax } from '../../styles/breakpoint'

const StyledLi = styled.li`
  background-color: var(--color-white-0);
  padding: 2rem;
  position: relative;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  display: flex;
  justify-content: end;
  @media ${devicesMax.sm} {
  }
`

const CurName = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledLeft = styled.div`
  position: absolute;
  top: 20%;
  left: -20px;
  height: 50%;
  border-radius: var(--border-radius-lg);
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;


  ${(props) =>
    props.type === 'btc' &&
    css`
      background-color: var(--color-bitcoin-500);
    `}
  ${(props) =>
    props.type === 'usdt' &&
    css`
      background-color: var(--color-usdt-500);
    `}
    ${(props) =>
      props.type === 'doge' &&
      css`
        background-color: var(--color-doge-500);
      `}
      ${(props) =>
        props.type === 'ethereum' &&
        css`
          background-color: var(--color-ethereum-500);
        `}
        ${(props) =>
          props.type === 'litecoin' &&
          css`
            background-color: var(--color-litecoin-500);
          `}
          ${(props) =>
            props.type === 'bitcsh' &&
            css`
              background-color: var(--color-bitcsh-500);
            `}
`
const StyledRight = styled.div`
  flex: 1;
  margin-left: 3rem;
`
const Img = styled.img`
  height: 4rem;
  width: 4rem;
`
const StyledRate = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
`
const StyledStock = styled.span`
  padding: 2px;
  text-transform: capitalize;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.type === 'instock' &&
    css`
      background-color: var(--color-bitcoin-500);
    `}
  ${(props) =>
    props.type === 'outstock' &&
    css`
      background-color: var(--color-red-500);
    `}
`

function Card({ name, image, color, sell, buy, stock }) {
  return (
    <StyledLi>
      <StyledLeft type={color}>{<Img src={image} alt="image" />}</StyledLeft>
      <StyledRight>
        <CurName>
          <Heading as="h3">{name}</Heading>

          <StyledStock type={stock}>{stock}</StyledStock>
        </CurName>
        <div>
          <StyledRate>
            <span>BUYING: </span>
            <span>&#8373;{buy}</span>
            <Button size="small" variation="buy">
              BUY
            </Button>
          </StyledRate>
          <StyledRate>
            <span>SELLING: </span>
            <span>&#8373;{sell}</span>
            <Button size="small" variation="sell">
              SELL
            </Button>
          </StyledRate>
        </div>
      </StyledRight>
    </StyledLi>
  )
}

export default Card
