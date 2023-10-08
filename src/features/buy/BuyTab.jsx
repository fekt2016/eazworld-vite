import { useState } from 'react'
import { styled } from 'styled-components'

const StyledTabs = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledConTabs = styled.div``

const StyledCon = styled.div``

function BuyTab() {
  const [toggle, setToggle] = useState(1)

  return (
    <div>
      <StyledTabs>
        <button onClick={() => setToggle(1)}>tab 1</button>
        <button onClick={() => setToggle(2)}>tab 2</button>
        <button onClick={() => setToggle(3)}>tab 3</button>
      </StyledTabs>

      <StyledConTabs>
        {toggle === 1 && (
          <StyledCon>
            <h2>content 1</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate et magnam voluptatibus deserunt, explicabo ullam fugiat
              ab possimus quaerat dolore?
            </p>
          </StyledCon>
        )}
        {toggle === 2 && (
          <StyledCon>
            <h2>content 2</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate et magnam voluptatibus deserunt, explicabo ullam fugiat
              ab possimus quaerat dolore?
            </p>
          </StyledCon>
        )}
        {toggle === 3 && (
          <StyledCon>
            <h2>content 3</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate et magnam voluptatibus deserunt, explicabo ullam fugiat
              ab possimus quaerat dolore?
            </p>
          </StyledCon>
        )}
      </StyledConTabs>
    </div>
  )
}

export default BuyTab
