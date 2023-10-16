import Spinner from '../../ui/Spinner'
import BuyRow from './BuyRow'
import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import { useBuy } from './useBuy'

function BuyTable() {
  const { data: buy, isLoading, error } = useBuy()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  return (
    <Table type="table" columns="repeat(8, 1fr)">
      <Table.Header role="row">
        <div>date</div>
        <div>id</div>
        <div>currency</div>
        <div>amountUsd</div>
        <div>amountGh</div>
        <div>total am.</div>
        <div>payment</div>
        <div>status</div>
      </Table.Header>

      <Table.Body
        data={buy}
        render={(buy) => <BuyRow key={buy.id} buy={buy} />}
      />
      <Table.Footer>
        <Pagination count={20} />
      </Table.Footer>
    </Table>
  )
}

export default BuyTable
