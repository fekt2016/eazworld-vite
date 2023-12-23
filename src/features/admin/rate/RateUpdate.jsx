// import Form from '../../../ui/Form'
// import FormRow from '../../../ui/FormRow'
// import Input from '../../../ui/Input'
// import Button from '../../../ui/Button'
// import { useUpdateRate } from './useUpdateRate'
// import { useForm } from 'react-hook-form'

import ManageRate from './ManageRate'

function RateUpdate() {
  // const { register, handleSubmit, formState } = useForm()
  // const { errors } = formState
  // console.log(errors)
  // function onSubmit(data) {
  //   console.log(data)
  // }
  return (
    <div>
      <ManageRate />
      {/* <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Bitcoin buy">
          <Input step="any" type="number" {...register('bitcoin-buy')} />
        </FormRow>
        <FormRow label="Bitcoin sell">
          <Input step="any" type="number" {...register('bitcoin-sell')} />
        </FormRow>
        <FormRow label="tether buy">
          <Input step="any" type="number" {...register('tether-buy')} />
        </FormRow>
        <FormRow label="tether sell">
          <Input step="any" type="number" {...register('tether-sell')} />
        </FormRow>
        <FormRow label="stock">
          <Input step="any" type="text" {...register('stock')} />
        </FormRow>
        <FormRow>
          <Button>update</Button>
        </FormRow>
      </Form> */}
    </div>
  )
}

export default RateUpdate
