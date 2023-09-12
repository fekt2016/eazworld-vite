import Heading from '../ui/Heading'
import PriceCard from '../ui/Price'
import Row from '../ui/Row'

function Dashboard() {
  return (
    <>
      <Row>
        <Heading type="h1">Dashbaord</Heading>
      </Row>
      <Row>
        <PriceCard />
      </Row>
    </>
  )
}

export default Dashboard
