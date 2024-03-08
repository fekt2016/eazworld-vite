import styled from 'styled-components'
import Table from '../../ui/Table'
import { formatTime } from '../../utils/helpers'
import { devicesMax } from '../../styles/breakpoint'

const Date = styled.div``

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;

  @media ${devicesMax.md} {
    display: none;
  }
`

function CustomerRow({ user }) {
  return (
    <Table.Row columns="repeat(4, 1fr)">
      <Date>{formatTime(user.created_at)}</Date>
      <Price>{user.email}</Price>
      <Price>{name}</Price>
      <Price>{user.role}</Price>
    </Table.Row>
  )
}

export default CustomerRow
