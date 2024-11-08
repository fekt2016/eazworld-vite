import Header from '../features/home/Header'
import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'

import Footer from '../features/home/Footer'
import NewSteps from '../features/home/NewSteps'
import Safe from '../features/home/Safe'
import Whatsapp from '../ui/Whatsapp'
import Alert from '../ui/Alert'
function Home() {
  return (
    <>
      <Alert />
      <Header />
      <Service />
      <Safe />
      <RateCard />
      <StyledSection type="step">
        <NewSteps />
      </StyledSection>
      <Footer />
      <Whatsapp />
    </>
  )
}

export default Home
