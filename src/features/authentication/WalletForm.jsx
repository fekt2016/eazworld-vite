import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Select from '../../ui/Select'

function WalletForm() {
  return (
    <Form>
      <FormRow label="Select Currency">
        <Select
          id="currency"
          options={[
            { value: 'bitcoin', label: 'Bitcoin btc' },
            { value: 'Tether', label: 'Tether Usdt' },
            { value: 'ethereum', label: 'Ethereum eth' },
          ]}
        />
      </FormRow>
      <FormRow label="Wallet Address">
        <Input type="text" id="firstName" />
      </FormRow>
      <FormRow>
        <Button>Add Wallet</Button>
      </FormRow>
    </Form>
  )
}

export default WalletForm
