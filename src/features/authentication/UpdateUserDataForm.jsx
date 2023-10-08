// import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

// import { useUser } from '../'

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  // const {
  //   user: {
  //     email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useUser()

  // const [fullName, setFullName] = useState()
  // const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Fiirst Name">
        <Input type="" text id="firstName" />
      </FormRow>
      <FormRow label="Last Name">
        <Input
          type="text"
          // value={}
          // onChange={(e) => setFullName(e.target.value)}
          id="lastName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          // onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
