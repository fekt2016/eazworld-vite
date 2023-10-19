import Spinner from '../../ui/Spinner'
import BuyRow from './BuyRow'
import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import { useBuy } from './useBuy'
import Menus from '../../ui/Menus'
import { devicesMax } from '../../styles/breakpoint'
import styled from 'styled-components'

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
const BuyId = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
function BuyTable() {
  const { data: buy, isLoading, error } = useBuy()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  return (
    <Menus>
      <Table type="table" columns="repeat(9, 1fr)">
        <Table.Header role="row">
          <Date>date</Date>
          <BuyId>id</BuyId>
          <div>currency</div>
          <StyledAmount>amountUsd</StyledAmount>
          <StyledAmount>amountGh</StyledAmount>
          <StyledAmount>total am.</StyledAmount>
          <Payment>payment</Payment>
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
    </Menus>
  )
}

export default BuyTable
