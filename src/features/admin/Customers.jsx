import styled from 'styled-components'
import { useUsers } from './useUsers'
// import { formatTime } from '../../utils/helpers'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CustomerRow from './CustomerRow'
import Pagination from '../../ui/Pagination'
import { devicesMax } from '../../styles/breakpoint'
import { FcCustomerSupport } from 'react-icons/fc'

// const StyledLi = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: start;

//   div {
//     flex: 1;
//   }

//   &:nth-of-type(even) {
//     background-color: var(--color-black-200);
//   }
// `

const StyledD = styled.div`
  @media ${devicesMax.md} {
    display: none;
  }
`
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

function Customers() {
  const { data, isLoading } = useUsers()

  if (isLoading) return <Spinner />

  const { users, count } = data

  return (
    <div>
      <Count>
        <IconBox>
          <FcCustomerSupport />
        </IconBox>
        {count}
      </Count>
      <Table type="table" columns="repeat(4, 1fr)">
        <Table.Header role="row">
          <StyledD>date</StyledD>
          <StyledD>Email</StyledD>
          <StyledD>Name</StyledD>
          <StyledD>Role</StyledD>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <CustomerRow key={user.id} user={user} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      {/* <ul>
        {users.map((user) => (
          <StyledLi key={user.id}>
            <div>{formatTime(user.created_at)}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
          </StyledLi>
        ))}
      </ul> */}
    </div>
  )
}

export default Customers
