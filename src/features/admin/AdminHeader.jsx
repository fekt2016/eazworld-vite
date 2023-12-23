/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import styled from 'styled-components'
import ManageOrderBuy from './ManageOrderBuy'
import ManageOrderSell from './ManageOrderSell'

const StyledHeader = styled.header`
  /* color: var(--color-white-0); */

  margin: 2rem;
`
const StyledHead = styled.div`
  display: flex;
  justify-content: space-around;
`
const StyledBuy = styled.div`
  background-color: var(--color-litecoin-500);
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Rate = styled.div`
  background-color: var(--color-doge-500);
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`
const StyledSell = styled.div`
  background-color: var(--color-doge-500);
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        <StyledHead>
          <button onClick={() => setToggle(1)}>
            <StyledBuy>
              <span>Buy Order</span>
              <span>0</span>
            </StyledBuy>
          </button>
          <button onClick={() => setToggle(2)}>
            <StyledSell>
              <span>Sell Order</span>
              <span>0</span>
            </StyledSell>
          </button>
          <button onClick={() => setToggle(3)}>
            <Rate>
              <span>Rate form</span>
            </Rate>
          </button>
        </StyledHead>
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
          <div>rate form</div>
        </Main>
      )}
    </>
  )
}

export default AdminHeader
