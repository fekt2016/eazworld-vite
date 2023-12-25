/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import styled, { css } from 'styled-components'
import ManageOrderBuy from './ManageOrderBuy'
import ManageOrderSell from './ManageOrderSell'
import ManageRate from './rate/ManageRate'
import { devicesMax } from '../../styles/breakpoint'
import Customers from '../admin/Customers'
import Miner from './mine/Miner'

const StyledHeader = styled.header`
  background-color: var(--color-white-0);
  padding: 2rem;
  display: flex;
  gap: 2rem;

  @media ${devicesMax.md} {
    font-size: 1rem;
  }
`
const Btn = styled.button`
  padding: 0.5rem 1rem;
  border: none;

  ${(props) =>
    props.type === 'buy' &&
    css`
      color: var(--color-yellow-700);
      background-color: var(--color-yellow-100);
    `}
  ${(props) =>
    props.type === 'sell' &&
    css`
      background-color: var(--color-blue-100);
      color: var(--color-blue-700);
    `}
    ${(props) =>
      props.type === 'rate' &&
      css`
        background-color: var(--color-indigo-100);
        color: var(--color-indigo-700);
      `}
`

const Main = styled.div`
  background-color: var(--color-white-0);
  margin: 2rem;
  padding: 2rem;
`
function AdminHeader() {
  const [toggle, setToggle] = useState(1)

  return (
    <>
      <StyledHeader>
        <Btn type="buy" onClick={() => setToggle(1)}>
          Buy Orders
        </Btn>
        <Btn type="sell" onClick={() => setToggle(2)}>
          Sell Orders
        </Btn>
        <Btn type="rate" onClick={() => setToggle(3)}>
          Rate Update
        </Btn>

        <Btn type="rate" onClick={() => setToggle(4)}>
          Customers
        </Btn>
      </StyledHeader>

      {toggle === 1 && (
        <Main>
          <ManageOrderBuy />
        </Main>
      )}
      {toggle === 2 && (
        <Main>
          <ManageOrderSell />
        </Main>
      )}
      {toggle === 3 && (
        <Main>
          <ManageRate />
          <Miner />
        </Main>
      )}

      {toggle === 4 && (
        <Main>
          <Customers />
        </Main>
      )}
    </>
  )
}

export default AdminHeader
