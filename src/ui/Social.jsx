import { FaPhoneVolume } from 'react-icons/fa6'
import { SiWhatsapp } from 'react-icons/si'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Img from './Img'
const Icon = styled(FaPhoneVolume)`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--color-indigo-700);
`
const IconW = styled(SiWhatsapp)`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--color-whatsapp-100);
`
const Content = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 2rem;
  align-items: center;
`

function Social() {
  return (
    <>
      <Content>
        <Img src="../../public/4.png" />
        <div>
          <p>eazworld@eazworld.com</p>
          <p>fekt2016@icloud.com</p>
        </div>
      </Content>
      <Content>
        <Icon />
        <div>
          <p>0244388190</p>
          <p>0235222207</p>
        </div>
      </Content>
      <Content>
        <Link to="https://wa.me/233235222207">
          <IconW />
        </Link>
        <p>0235222207</p>
      </Content>
    </>
  )
}

export default Social
