import styled from 'styled-components'
import { usePayment } from '../admin/usePayment'
// import { formatTime } from '../../utils/helpers'
import Table from '../../ui/Table'

import PaymentRow from './PaymentRow'
import Pagination from '../../ui/Pagination'
import { FaAmazonPay } from 'react-icons/fa6'
import Spinner from '../../ui/Spinner'

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;

//   div {
//     flex: 1;
//   }
//   &:nth-of-type(even) {
//     background-color: var(--color-black-200);
//   }
// `
function Payment() {
  const { isLoading, data } = usePayment()

  if (isLoading) return <Spinner />

  const { payment, count } = data

  const StyledD = styled.div``
  const Count = styled.div`
    max-width: 50rem;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `
  const IconBox = styled.div`
    background-color: var(--color-red-500);
    margin-right: 1rem;
    height: 5rem;
    width: 5rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  return (
    <div>
      <Count>
        <IconBox>
          <FaAmazonPay />
        </IconBox>
        {count}
      </Count>

      <Table type="table" columns="repeat(6, 1fr)">
        <Table.Header role="row">
          <StyledD>date</StyledD>
          <StyledD>Order Id</StyledD>
          <StyledD>paid Amount</StyledD>
          <StyledD>Paid Num</StyledD>
          <StyledD>Account</StyledD>
          <StyledD>Acc.name</StyledD>
        </Table.Header>

        <Table.Body
          data={payment}
          render={(pay) => <PaymentRow key={pay.id} pay={pay} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </div>
  )
}

export default Payment
