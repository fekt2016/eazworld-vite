import { getSell } from '../../services/apiSell'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../../ui/Spinner'
import SellRow from './SellRow'
import Table from '../../ui/Table'

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
//   text-transform: capitalize;
// `

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

function SellTable() {
  const { isLoading, data: selling } = useQuery({
    queryKey: ['sell'],
    queryFn: getSell,
  })

  if (isLoading) return <Spinner />

  return (
    <Table columns="repeat(6, 1fr)">
      <Table.Header role="row">
        <div>date</div>
        <div>id</div>
        <div>currency</div>
        <div>amountUSD</div>
        <div>payment</div>
        <div>status</div>
      </Table.Header>
      <Table.Body
        data={selling}
        render={(sell) => <SellRow key={sell.id} sell={sell} />}
      />
    </Table>
  )
}

export default SellTable
