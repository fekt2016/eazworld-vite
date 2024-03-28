import Table from '../../ui/Table'
import { useAllBuy } from '../buy/useAllBuy'
import Spinner from '../../ui/Spinner'
import AdminBuyRow from './AdminBuyRow'
import Stat from '../../ui/Stat'
import { GiPayMoney } from 'react-icons/gi'
import Pagination from '../../ui/Pagination'
import styled from 'styled-components'
import { devicesMax } from '../../styles/breakpoint'
import AdminTableOperations from './AdminTableOperations'
import Row from '../../ui/Row'
import { useSearchParams } from 'react-router-dom'

const StyledD = styled.div`
  @media ${devicesMax.md} {
    font-size: 1rem;
  }
`
const Email = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

function ManageOrderBuy() {
  const { buy, isLoading, error, count } = useAllBuy()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  //filter
  const filterValue = searchParams.get('buy-order') || 'all'

  let filteredBuy
  if (filterValue === 'all') filteredBuy = buy
  if (filterValue === 'order-completed')
    filteredBuy = buy.filter((b) => b.status === 'order completed')
  if (filterValue === 'add-payment')
    filteredBuy = buy.filter((b) => b.status === 'add payment')

  //sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedBuy = filteredBuy.sort((a, b) => (a[field] - b[field]) * modifier)

  return (
    <>
      <div>
        <Stat
          svgcolor="var(--color-yellow-700)"
          title="Buy orders"
          color="var(--color-yellow-100)"
          icon={<GiPayMoney />}
          value={count}
        />
      </div>
      <Row type="admin">
        <AdminTableOperations />
      </Row>

      <Table type="table" columns="repeat(8, 1fr)" mincol="repeat(5, 1fr)">
        <Table.Header role="row">
          <StyledD>date</StyledD>
          <StyledD>id</StyledD>
          <Email>$Usd</Email>
          <Email>total</Email>
          <StyledD>wallet</StyledD>
          <Email>email</Email>
          <StyledD>status</StyledD>
        </Table.Header>

        <Table.Body
          data={sortedBuy}
          render={(buy) => <AdminBuyRow key={buy.id} buy={buy} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  )
}

export default ManageOrderBuy
