import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

function VerificationForm() {
  return (
    <Form>
      <FormRow label="Select Valid National ID">
        <Input type="file" />
      </FormRow>
      <FormRow label="Select Selfie With National ID">
        <Input type="file" />
      </FormRow>
      <FormRow label="Select Selfie Paper Verification">
        <Input type="file" />
      </FormRow>
      <FormRow>
        <Button>Add Wallet</Button>
      </FormRow>
    </Form>
  )
}

export default VerificationForm
