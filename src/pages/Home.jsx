// import Header from '../features/home/Header'
// import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'

import Footer from '../features/home/Footer'
import NewSteps from '../features/home/NewSteps'
// import Safe from '../features/home/Safe'

import Whatsapp from '../ui/Whatsapp'
import Slider from '../eazworldshop/Slider'
import Product from '../eazworldshop/Product'

const slides = [
  { url: '../../steps.avif', title: 'fill your basket with joy' },
  { url: '../../photo.avif', title: 'new arrival in iphone cases' },
  { url: '../../head.avif', title: 'phone favoutries' },
  { url: '../../phone1.avif', title: 'shop anything here' },
]

function Home() {
  const containerStyles = {
    width: '100vw',
    height: '600px',
    margin: '0 auto',
    zIndex: '-10',
  }

  return (
    <>
      <div style={containerStyles}>
        <Slider slides={slides} />
      </div>
      {/* <Header /> */}
      {/* <Service /> */}
      {/* <Safe /> */}
      <Product />
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
