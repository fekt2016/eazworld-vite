import styled, { css } from 'styled-components'
import Row from '../ui/Row'
import Heading from '../ui/Heading'
import Form from '../ui/Form'
import FormRow from '../ui/FormRow'
import Input from '../ui/Input'
import Button from '../ui/Button'
// import Maps from '../ui/Maps'
import Address from '../ui/Address'
import Social from '../ui/Social'
import Support from '../ui/Support'
import Maps from '../ui/Maps'

const Container = styled.div`
  width: 100vw;
  margin: 2rem auto;
`
const Content = styled.div`
  background-color: var(--color-black-950);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 8rem;
`
const Box = styled.div`

  background-color: var(--color-white-0);
  border-radius: 50px;
  overflow: hidden;

  ${(props) =>
    props.type === 'form' &&
    css`
      grid-column: 2/-1;
      height: 30rem;
    `}
  ${(props) =>
    props.type === 'social' &&
    css`
      height: 25rem;
      grid-column: 1/-1;

      display: flex;
      justify-content: space-around;
      align-items: center;
    `}
  ${(props) =>
    props.type === 'address' &&
    css`
      grid-column: 1/2;
      grid-row: 1/2;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  ${(props) =>
    props.type === 'map' &&
    css`
      grid-column: 1/3;
      grid-row: 2/4;
    `}
  ${(props) =>
    props.type === 'support' &&
    css`
      grid-column: 3/-1;
      grid-row: 2/4;
    `}
`
function Contact() {
  return (
    <Container>
      <Row type="contact">
        <Heading as="h2">Contact us</Heading>
      </Row>
      <Content>
        <Box type="form">
          <Heading as="h4">Get in touch with</Heading>
          <Form>
            <FormRow label="Name">
              <Input type="text" />
            </FormRow>
            <FormRow label="Number">
              <Input type="number" />
            </FormRow>
            <FormRow label="Message">
              <Input type="text" />
            </FormRow>
            <FormRow>
              <Button variation="secondary">Talk to Eazworld</Button>
            </FormRow>
          </Form>
        </Box>
        <Box type="address">
          <Address />
        </Box>
        <Box type="map">
          <Maps />
        </Box>
        <Box type="social">
          <Social />
        </Box>
        <Box type="support">
          <Support />
        </Box>
      </Content>
    </Container>
  )
}

export default Contact
