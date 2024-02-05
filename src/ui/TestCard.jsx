import styled from 'styled-components'
import Heading from './Heading'
import { useUser } from '../features/authentication/useUser'

const Card = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: var(--color-green-100);
  padding: 1rem;
  text-transform: capitalize;
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`
const Img = styled.img`
  height: 5rem;
  margin-right: 2rem;
`
const Loc = styled.p`
  color: var(--color-red-800);
`
function TestCard({ fullName, msg, loc }) {
  const { user } = useUser()
  const { avatar } = user.user_metadata

  return (
    <Card>
      <Img src={avatar} alt={fullName} />
      <div>
        <Heading as="h5">{fullName}</Heading>
        <p>&#34;{msg}&#34;</p>
        <Loc>{loc}</Loc>
      </div>
    </Card>
  )
}

export default TestCard
