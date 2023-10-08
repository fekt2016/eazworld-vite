import HomeNav from '../features/home/HomeNav'
import Header from '../features/home/Header'
import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'
import Heading from '../ui/Heading'
import Step from '../features/home/Step'
import Footer from '../features/home/Footer'
// import Slider from '../features/home/Slider'

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
      {/* <StyledSection type="slider">
        <Slider />
      </StyledSection> */}
      <StyledSection type="step">
        <Step />
      </StyledSection>
      <Footer />
    </>
  )
}

export default Home
