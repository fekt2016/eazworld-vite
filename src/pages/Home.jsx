// import HomeNav from '../features/home/HomeNav'
import Header from '../features/home/Header'
import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'

import Footer from '../features/home/Footer'
import NewSteps from '../features/home/NewSteps'
import Safe from '../features/home/Safe'

function Home() {
  return (
    <>
      <Header />
      <Service />
      <Safe />
      <RateCard />
      <StyledSection type="step">
        <NewSteps />
      </StyledSection>
      <Footer />
    </>
  )
}

export default Home
