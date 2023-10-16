import { useState } from 'react'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { resetPassword } from '../../services/apiAuth'

function UpdateUserPasswordForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    resetPassword(email, password)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="New Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // disabled={isLoading}
        />
      </FormRowVertical>
      <Button>Send</Button>
    </Form>
  )
}

export default UpdateUserPasswordForm
