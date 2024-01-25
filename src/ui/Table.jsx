/* eslint react/prop-types: 0 */
import { createContext, useContext } from 'react'
import styled from 'styled-components'
import Empty from '../ui/Empty'
import { devicesMax } from '../styles/breakpoint'

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;

  @media ${devicesMax.md} {
    font-size: 1rem;
  }
`

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media ${devicesMax.md} {
    grid-template-columns: repeat(4, 1fr);
    padding: 1rem 1.5rem;
  }
`

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media ${devicesMax.md} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devicesMax.md} {
    padding: 1rem 1.5rem;
  }
`

const StyledBody = styled.section`
  margin: 0.4rem 0;
`

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }

  @media ${devicesMax.md} {
    flex-direction: column;
  }
`

const TableContext = createContext()

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable row="table">{children}</StyledTable>
    </TableContext.Provider>
  )
}

function Header({ children }) {
  const { columns } = useContext(TableContext)

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  )
}
function Row({ children }) {
  const { columns } = useContext(TableContext)

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  )
}

function Body({ data, render }) {
  if (!data.length) return <Empty>There is no data at the moment </Empty>
  return <StyledBody>{data.map(render)}</StyledBody>
}
Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Footer = Footer

export default Table
