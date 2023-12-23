import Table from '../../ui/Table'
import { useAllBuy } from '../buy/useAllBuy'
import Spinner from '../../ui/Spinner'
import AdminBuyRow from './AdminBuyRow'
import Stat from '../../ui/Stat'
import { HiArrowUpOnSquareStack } from 'react-icons/hi2'

function ManageOrderBuy() {
  const { data, isLoading, error } = useAllBuy()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  const { buy, count } = data

  return (
    <>
      <div>
        <Stat
          // svgcolor="var(--color-yellow-700)"
          title="Buy orders"
          color="var(--color-yellow-100)"
          icon={<HiArrowUpOnSquareStack />}
          value={count}
        />
      </div>
      <div>
        <Table type="table" columns="repeat(9, 1fr)">
          <Table.Header role="row">
            <div>date</div>
            <div>id</div>
            <div>currency</div>
            <div>amountUsd</div>
            <div>amountGh</div>
            <div>total am.</div>
            <div>payment</div>
            <div>email</div>
            <div>status</div>
          </Table.Header>

          <Table.Body
            data={buy}
            render={(buy) => <AdminBuyRow key={buy.id} buy={buy} />}
          />
          <Table.Footer></Table.Footer>
        </Table>
      </div>
    </>
  )
}

export default ManageOrderBuy
