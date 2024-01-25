import styled from 'styled-components'
import { useUsers } from './useUsers'

const StyledLi = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: start;
`
function Customers() {
  const { data, isLoading } = useUsers()

  if (isLoading) return <p>loading</p>

  const { users, count } = data

  return (
    <div>
      <div>{count}</div>
      {users.map((user) => (
        <ul key={user.id}>
          <StyledLi>
            <div>{user.id}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
          </StyledLi>
        </ul>
      ))}
    </div>
  )
}

export default Customers
