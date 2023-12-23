import Row from '../ui/Row'
import Heading from '../ui/Heading'
import styled from 'styled-components'
import AdminHeader from '../features/admin/AdminHeader'

const StyledAdmin = styled.div`
  background-color: var(--color-grey-200);
`

function Admin() {
  return (
    <StyledAdmin>
      <Row>
        <Heading as="h1">admin dashboard</Heading>
      </Row>
      <AdminHeader />
    </StyledAdmin>
  )
}

export default Admin
