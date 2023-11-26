import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Select from '../../ui/Select'

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

function WalletForm() {
  return (
    <WalletContainer>
      <h4>Bitcoin address</h4>
      <Form>
        <FormRow label="Select Currency">
          <Select>
            <option>Select currency</option>
            <option>Bitcoin</option>
            <option>Tether</option>
          </Select>
        </FormRow>
        <FormRow label="Wallet Address">
          <Input id="wallet" type="text" />
        </FormRow>
        <FormRow>
          <Button>Add Wallet</Button>
        </FormRow>
      </Form>
    </WalletContainer>
  )
}

export default WalletForm
