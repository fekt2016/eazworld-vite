import Table from '../../ui/Table'
import { useAllBuy } from '../buy/useAllBuy'
import Spinner from '../../ui/Spinner'
import AdminBuyRow from './AdminBuyRow'
import Stat from '../../ui/Stat'
import { GiPayMoney } from 'react-icons/gi'
import Pagination from '../../ui/Pagination'
import styled from 'styled-components'
import { devicesMax } from '../../styles/breakpoint'
const StyledD = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`

function ManageOrderBuy() {
  const { data, isLoading, error } = useAllBuy()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message

  const { buy, count } = data

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
      <div>
        <Table type="table" columns="repeat(9, 1fr)">
          <Table.Header role="row">
            <div>date</div>
            <div>id</div>
            <StyledD>currency</StyledD>
            <StyledD>amountUsd</StyledD>
            <StyledD>amountGh</StyledD>
            <StyledD>total am.</StyledD>
            <StyledD>payment</StyledD>
            <div>email</div>
            <div>status</div>
          </Table.Header>

          <Table.Body
            data={buy}
            render={(buy) => <AdminBuyRow key={buy.id} buy={buy} />}
          />
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </div>
    </>
  )
}

export default ManageOrderBuy
