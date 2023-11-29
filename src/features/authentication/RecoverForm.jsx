import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useState } from 'react'
import FormRowVertical from '../../ui/FormRowVertical'
import { emailLink } from '../../services/apiAuth'
// import supabase from '../../services/supabase'

function RecoverForm() {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log(email)
    emailLink(email)
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
      <Button>Send</Button>
    </Form>
  )
}

export default RecoverForm
