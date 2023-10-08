import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

function PinCodeForm() {
  return (
    <Form>
      <FormRow label="4 Digit Code">
        <Input type="Number" />
      </FormRow>
      <FormRow label="Confirm Code">
        <Input type="Number" />
      </FormRow>
      <FormRow>
        {/* <Button type="reset" variation="secondary">
          Cancel
        </Button> */}
        <Button>Update Pin</Button>
      </FormRow>
    </Form>
  )
}

export default PinCodeForm
