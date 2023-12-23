import Table from '../../ui/Table'
import { useAllSell } from '../sell/useAllSell'
import Spinner from '../../ui/Spinner'
import AdminSellRow from '../admin/AdminSellRow'

function ManageOrderSell() {
  const { data, isLoading, error } = useAllSell()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  return (
    <>
      <Table columns="repeat(8, 1fr)">
        <Table.Header role="row">
          <div>date</div>
          <div>id</div>
          <div>currency</div>
          <div>amountUSD</div>
          <div>payment</div>
          <div>Customer</div>
          <div>email</div>
          <div>status</div>
        </Table.Header>
        <Table.Body
          data={data}
          render={(sell) => <AdminSellRow key={sell.id} sell={sell} />}
        />
        <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
      </Table>
    </>
  )
}

export default ManageOrderSell
