import Table from '../../ui/Table'
import { useAllSell } from '../sell/useAllSell'
import Spinner from '../../ui/Spinner'
import AdminSellRow from '../admin/AdminSellRow'
import { GiReceiveMoney } from 'react-icons/gi'
import Stat from '../../ui/Stat'
import Pagination from '../../ui/Pagination'
import styled from 'styled-components'

const StyledD = styled.div`
  display: none;
`

function ManageOrderSell() {
  const { data, isLoading, error } = useAllSell()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message
  const { data: sell, count } = data
  console.log(sell, count)
  return (
    <>
      <Stat
        svgcolor="var(--color-blue-700)"
        title="sell orders"
        color="var(--color-blue-100)"
        icon={<GiReceiveMoney />}
        value={count}
      />
      <Table columns="repeat(8, 1fr)">
        <Table.Header role="row">
          <div>date</div>
          <StyledD>id</StyledD>
          <StyledD>currency</StyledD>
          <StyledD>amountUSD</StyledD>
          <StyledD>payment</StyledD>
          <div>paid to</div>
          <div>email</div>
          <div>status</div>
        </Table.Header>
        <Table.Body
          data={sell}
          render={(sell) => (
            <AdminSellRow key={sell.id} sell={sell} count={count} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  )
}

export default ManageOrderSell
