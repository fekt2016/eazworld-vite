import HomeNav from '../features/home/HomeNav'
import Header from '../features/home/Header'
import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'
import Heading from '../ui/Heading'
<<<<<<< HEAD
import Step from '../features/home/Step'
=======
// import Step from '../features/home/Step'
>>>>>>> parent of 207a581 (major change)
import Footer from '../features/home/Footer'


function Home() {
  return (
    <>
      <HomeNav />
      <Header />
      <Service />
      <StyledSection type="safe">
        <Heading as="h2">A safe place to buy & sell crypto</Heading> We’re
        focused on providing innovative security solutions to protect your
        assets.
      </StyledSection>
      <RateCard />
      <StyledSection type="step">
<<<<<<< HEAD
        <Step />
=======
        {/* <Step /> */}
        <NewSteps />
>>>>>>> parent of 207a581 (major change)
      </StyledSection>
      <Footer />
    </>
  )
}

export default Home
