import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";
import { useRecoverEmail } from "./useRecoverEmail";
import SpinnerMini from "../../ui/SpinnerMini";

function RecoverForm() {
  const [email, setEmail] = useState("");
  const { recover, isLoading } = useRecoverEmail();

  async function handleSubmit(e) {
    console.log(email);
    e.preventDefault();
    recover(email);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <Button>{isLoading ? <SpinnerMini /> : "Send"}</Button>
    </Form>
  );
}

export default RecoverForm;
