import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CompleteBuyOrder from '../features/buy/CompleteBuyOrder'

function Buy() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Buy</Heading>
      </Row>
      <CompleteBuyOrder />
    </>
  )
}

export default Buy
