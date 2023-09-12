// import SellTable from '../features/sell/SellTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CreateSellForm from '../features/sell/CreateSellForm'

function Sell() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sell </Heading>
      </Row>
      <Row>
        <CreateSellForm />
      </Row>
    </>
  )
}

export default Sell
