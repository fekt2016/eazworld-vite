import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useState } from 'react'
import FormRowVertical from '../../ui/FormRowVertical'
import supabase from '../../services/supabase'
// import { emailLink } from '../../services/apiAuth'

function RecoverForm() {
  const [email, setEmail] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(email)
    let { data, error } = await supabase.auth.resetPasswordForEmail(
      'mapag25220@wuzak.com',
    )
    // emailLink(email)
    console.log(data, error)
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
