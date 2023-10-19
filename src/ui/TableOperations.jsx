import styled from 'styled-components'
import { devicesMax } from '../styles/breakpoint'

const TableOperations = styled.div`
  display: flex;

  align-items: center;
  gap: 1.6rem;
  @media ${devicesMax.md} {
    flex-direction: column;
  }
`

export default TableOperations
