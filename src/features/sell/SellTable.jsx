import Spinner from '../../ui/Spinner'
import SellRow from './SellRow'
import Table from '../../ui/Table'
import { useSell } from './useSell'
import Pagination from '../../ui/Pagination'
import styled from 'styled-components'
import { devicesMax } from '../../styles/breakpoint'
import Menus from '../../ui/Menus'

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

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

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
          data={sell}
          render={(sell) => <SellRow key={sell.id} sell={sell} />}
        />
        <Table.Footer>
          <Pagination count={5} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default SellTable
