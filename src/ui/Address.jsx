import { PiAddressBookFill } from 'react-icons/pi'
import styled from 'styled-components'

const Icon = styled(PiAddressBookFill)`
  font-size: 7rem;
  color: var(--color-sec-800);
  margin-bottom: 1rem;
`
function Address() {
  return (
    <>
      <Icon />
      <p>House No. E1/12 Nima</p>
      <p>Al Waleed bin tala Highway</p>
      <p>opposite the nima/accra lorry station</p>
      <p>adjacent to the Al-ummah mosque</p>
      <p>------</p>
      <p>Digital Address: GA-070-6737</p>
    </>
  )
}

export default Address
