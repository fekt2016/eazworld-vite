import Spinner from '../../ui/Spinner'
import BuyRow from './BuyRow'
import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import { useBuy } from './useBuy'
import Menus from '../../ui/Menus'
import { devicesMax } from '../../styles/breakpoint'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'

const StyledAmount = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const Payment = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

function BuyTable() {
  const { data: buy, isLoading, error } = useBuy()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message
  const { data, count } = buy

  //filter
  const filterValue = searchParams.get('buy-order') || 'all'

  let filteredBuy
  if (filterValue === 'all') filteredBuy = data
  if (filterValue === 'order-completed')
    filteredBuy = data.filter((b) => b.status === 'order completed')
  if (filterValue === 'add-payment')
    filteredBuy = data.filter((b) => b.status === 'add payment')

  //sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedBuy = filteredBuy.sort((a, b) => (a[field] - b[field]) * modifier)

  //pagination

  return (
    <Menus>
      <Table type="table" columns="repeat(8, 1fr)">
        <Table.Header role="row">
          <div>date</div>
          <div>id</div>
          <div>cur</div>
          <div>am.Usd</div>
          <StyledAmount>amountGh</StyledAmount>
          <div>total</div>
          <Payment>payment</Payment>
          <div>status</div>
        </Table.Header>

        <Table.Body
          data={sortedBuy}
          render={(buy) => <BuyRow key={buy.id} buy={buy} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default BuyTable
