import Form from '../../../ui/Form'
import FormRow from '../../../ui/FormRow'
import Input from '../../../ui/Input'
import { useForm } from 'react-hook-form'
import Button from '../../../ui/Button'
import Heading from '../../../ui/Heading'
import { useMiners } from './useMiners'
import { useUpdateMiners } from './useUpdateMiners'

function Miner() {
  const { register, handleSubmit } = useForm()
  const { miner, isLoading } = useMiners()
  const { updateMiners } = useUpdateMiners()

  if (isLoading) return <p>loading...</p>
  console.log(miner)
  const value = miner[0]
  console.log(value.id)

  function onSubmit(data) {
    console.log(data)
    updateMiners({ newFee: { ...data }, id: value.id })
  }
  return (
    <div>
      <div>
        <Heading as="h4">miner</Heading>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Normal Fee">
          <Input id="normal" type="number" step="any" {...register('normal')} />
        </FormRow>
        <FormRow label="priority fee">
          <Input
            id="priority"
            type="number"
            step="any"
            {...register('priority')}
          />
        </FormRow>
        <FormRow>
          <Button>edit</Button>
        </FormRow>
      </Form>
    </div>
  )
}

export default Miner
