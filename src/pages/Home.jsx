// import HomeNav from '../features/home/HomeNav'
import Header from '../features/home/Header'
import Service from '../ui/Service'
import StyledSection from '../features/home/Section'
import RateCard from '../features/home/RateCard'

import Footer from '../features/home/Footer'
import NewSteps from '../features/home/NewSteps'
import Safe from '../features/home/Safe'
import CookieConsent from 'react-cookie-consent'
import Whatsapp from '../ui/Whatsapp'

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
      <CookieConsent
        location="bottom"
        buttonText="Sure man!!"
        cookieName="myAwesomeCookieName2"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
        <span style={{ fontSize: '10px' }}>This bit of text is smaller :O</span>
      </CookieConsent>
      <Whatsapp />
    </>
  )
}

export default Home
