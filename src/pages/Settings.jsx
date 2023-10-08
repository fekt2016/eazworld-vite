import Row from '../ui/Row'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import styled, { css } from 'styled-components'
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm'
import PinCodeForm from '../features/authentication/PinCodeForm'
import { devicesMax } from '../styles/breakpoint'
import { useState } from 'react'
import WalletForm from '../features/authentication/WalletForm'
import VerificationForm from '../features/authentication/VerificationForm'

const BtnRow = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--color-white-0);
  padding: 2rem;
  margin: 2rem;

  @media ${devicesMax.lg} {
    flex-direction: column;
  }
`
const ContentBox = styled.div`
  background-color: var(--color-white-0);
  margin: 0 auto;

  ${(props) => props.type === 'big' && css``}
`

function Settings() {
  const [showContent, setShowContent] = useState(1)
  return (
    <>
      <Row>
        <Heading as="h1">User profile</Heading>
      </Row>
      <BtnRow>
        <Button
          variation="secoundary"
          size="small"
          onClick={() => setShowContent(0)}
        >
          User Profile
        </Button>
        <Button
          variation="secoundary"
          size="small"
          onClick={() => setShowContent(1)}
        >
          Change Password
        </Button>
        <Button
          variation="secoundary"
          size="small"
          onClick={() => setShowContent(2)}
        >
          Change wallet Pin Code
        </Button>
        <Button
          variation="secoundary"
          size="small"
          onClick={() => setShowContent(3)}
        >
          ID Verification
        </Button>
        <Button
          variation="secoundary"
          size="small"
          onClick={() => setShowContent(4)}
        >
          Manage Wallet
        </Button>
      </BtnRow>
      <ContentBox>{showContent === 0 && <UpdateUserDataForm />}</ContentBox>
      <ContentBox>{showContent === 1 && <UpdatePasswordForm />}</ContentBox>
      <ContentBox>{showContent === 2 && <PinCodeForm />}</ContentBox>
      <ContentBox>{showContent === 3 && <VerificationForm />}</ContentBox>
      <ContentBox>{showContent === 4 && <WalletForm />}</ContentBox>
    </>
  )
}

export default Settings
