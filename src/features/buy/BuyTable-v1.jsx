import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { getBuy } from '../../services/apibuy'
import Spinner from '../../ui/Spinner'
import BuyRow from './BuyRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.2rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

function BuyTable() {
  const { isLoading, data: buying } = useQuery({
    queryKey: ['buy'],
    queryFn: getBuy,
  })

  if (isLoading) return <Spinner />

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>date</div>
        <div>id</div>
        <div>currency</div>
        <div>amountUsd</div>
        <div>amountGh</div>
        <div>total am.</div>
        <div>payment</div>
        <div>status</div>
      </TableHeader>
      {buying.map((buy) => (
        <BuyRow key={buy.id} buy={buy} />
      ))}
    </Table>
  )
}

export default BuyTable
