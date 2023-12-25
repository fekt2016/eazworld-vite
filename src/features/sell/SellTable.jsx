import Spinner from '../../ui/Spinner'
import SellRow from './SellRow'
import Table from '../../ui/Table'
import { useSell } from './useSell'
import Pagination from '../../ui/Pagination'
import styled from 'styled-components'
import { devicesMax } from '../../styles/breakpoint'
import Menus from '../../ui/Menus'
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
const Date = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
const SellId = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

function SellTable() {
  const { isLoading, data: sell, error } = useSell()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message
  const { data, count } = sell

  const filterValue = searchParams.get('sell-order') || 'all'

  //FILTER
  let filteredSell
  if (filterValue === 'all') filteredSell = data
  if (filterValue === 'order-completed')
    filteredSell = data.filter((s) => s.status === 'order completed')
  if (filterValue === 'processing')
    filteredSell = data.filter((s) => s.status === 'processing')

  //SORTING
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedSell = filteredSell.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  )

  return (
    <Menus>
      <Table columns="repeat(6, 1fr)">
        <Table.Header role="row">
          <Date>date</Date>
          <SellId>id</SellId>
          <div>currency</div>
          <StyledAmount>amountUSD</StyledAmount>
          <Payment>payment</Payment>
          <div>status</div>
        </Table.Header>
        <Table.Body
          data={sortedSell}
          render={(sell) => <SellRow key={sell.id} sell={sell} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default SellTable
