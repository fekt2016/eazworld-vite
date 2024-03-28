/* eslint react/prop-types: 0 */
import { createContext, useContext } from 'react'
import styled from 'styled-components'
import Empty from '../ui/Empty'
import { devicesMax } from '../styles/breakpoint'

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.6rem;
  border-radius: 7px;
  overflow: hidden;

  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
  @media ${devicesMax.sm} {
    font-size: 1rem;
  }
`

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1.5rem;
  align-items: center;
  transition: none;
  @media ${devicesMax.sm} {
    column-gap: 1.2rem;
  }
  @media ${devicesMax.sm} {
    column-gap: 1rem;
  }
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
    grid-template-columns: ${(props) => props.mincol};
    padding: 1rem 1.5rem;
  }
  @media ${devicesMax.sm} {
    grid-template-columns: ${(props) => props.mincol};
    padding: 0.7rem 1.2rem;
  }
`

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  grid-template-columns: ${(props) => props.columns};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media ${devicesMax.md} {
    grid-template-columns: ${(props) => props.mincol};
    padding: 1rem 1.5rem;
  }
  @media ${devicesMax.sm} {
    padding: 1rem 1.2rem;
  }
`

const StyledBody = styled.section`
  margin: 0.4rem 0;
`

const Footer = styled.footer`
  background-color: var(--color-grey-50);
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

function Table({ columns, children, mincol }) {
  return (
    <TableContext.Provider value={{ columns, mincol }}>
      <StyledTable row="table">{children}</StyledTable>
    </TableContext.Provider>
  )
}

function Header({ children }) {
  const { columns, mincol } = useContext(TableContext)

  return (
    <StyledHeader role="row" columns={columns} mincol={mincol}>
      {children}
    </StyledHeader>
  )
}
function Row({ children }) {
  const { columns, mincol } = useContext(TableContext)

  return (
    <StyledRow role="row" columns={columns} mincol={mincol}>
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
