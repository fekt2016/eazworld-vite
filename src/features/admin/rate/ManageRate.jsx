import { HiArrowUpOnSquareStack } from 'react-icons/hi2'
import RateRow from './RateRow'
import Stat from '../../../ui/Stat'
import Table from '../../../ui/Table'
import { useRate } from './useRate'
import Spinner from '../../../ui/Spinner'

function ManageRate() {
  const { isLoading, rate } = useRate()

  if (isLoading) return <Spinner />
  const { data } = rate

  return (
    <>
      <div>
        <Stat
          // svgcolor="var(--color-yellow-700)"
          title="rate"
          color="var(--color-yellow-100)"
          icon={<HiArrowUpOnSquareStack />}
        />
      </div>
      <div>
        <Table type="table" columns="repeat(7, 1fr)">
          <Table.Header role="row">
            <div>date</div>
            <div>id</div>
            <div>currency</div>
            <div>buy rate</div>
            <div>sell rate</div>
            <div>stock</div>
          </Table.Header>

          <Table.Body
            data={data}
            render={(rate) => <RateRow key={rate.id} rate={rate} />}
          />
          <Table.Footer></Table.Footer>
        </Table>
      </div>
    </>
  )
}

export default ManageRate
