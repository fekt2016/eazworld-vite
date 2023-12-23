// import styled from 'styled-components'
import Table from '../../ui/Table'
import { useAllBuy } from '../buy/useAllBuy'
import Spinner from '../../ui/Spinner'
<<<<<<< HEAD
import AdminBuyRow from './adminBuyRow'
=======
import AdminBuyRow from './AdminBuyRow'
<<<<<<< HEAD
>>>>>>> parent of 49283c7 (final)
=======
>>>>>>> parent of 49283c7 (final)

function ManageOrderBuy() {
  const { data, isLoading, error } = useAllBuy()

  if (isLoading) return <Spinner />
  if (error) return 'An error has occured: ' + error.message
  const { buy } = data

  return (
    <>
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
            <div>status</div>
            <div>email</div>
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
