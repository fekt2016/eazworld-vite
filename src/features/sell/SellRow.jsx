/* eslint react/prop-types: 0 */
import styled from 'styled-components'
import { formatTime } from '../../utils/helpers'

import Table from '../../ui/Table'
import { devicesMax } from '../../styles/breakpoint'
import { Link } from 'react-router-dom'

const Status = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Sono';
  color: white;
  border: none;
  background-color: ${(props) =>
    props.status === 'processing' ? '#000' : '#ffc337'};
  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`

const Sell = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  text-transform: capitalize;

  @media ${devicesMax.md} {
    font-size: 1.2rem;
  }
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;

  /* @media ${devicesMax.md} {
    display: none;
  } */
`

const Date = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const SellId = styled.div``

function SellRow({ sell }) {
  const {
    created_at: date,
    orderId: buyId,
    currency,
    amountUSD,
    payment,
    status,
  } = sell
  return (
    <>
      <Table.Row columns="repeat(6, 1fr)">
        <Date>{formatTime(date)}</Date>
        <SellId>{buyId}</SellId>
        <Sell>{currency}</Sell>
        <div>{amountUSD}</div>
        <Price>{payment}</Price>
        <Status status={status}>
          <Link to={`/sell-currentOrder/${buyId}`}>{status}</Link>
        </Status>
      </Table.Row>
    </>
  )
}

export default SellRow
