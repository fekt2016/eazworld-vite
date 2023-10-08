import Spinner from '../../ui/Spinner'
import SellRow from './SellRow'
import Table from '../../ui/Table'
import { useSell } from './useSell'
import Pagination from '../../ui/Pagination'

function SellTable() {
  const { isLoading, data: sell, error } = useSell()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

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
        data={sell}
        render={(sell) => <SellRow key={sell.id} sell={sell} />}
      />
      <Table.Footer>
        <Pagination count={5} />
      </Table.Footer>
    </Table>
  )
}

export default SellTable
