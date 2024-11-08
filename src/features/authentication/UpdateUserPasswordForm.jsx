import { useState } from "react";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import supabase from "../../services/supabase";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    setIsloading(true);
    console.log(email, password);

    e.preventDefault();
    const { data } = supabase.auth.updateUser({
      email,
      password,
    });
    console.log(data);
    setEmail("");
    setPassword("");
    setIsloading(false);
  };

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
      <FormRowVertical label="New Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <Button>{isLoading ? <SpinnerMini /> : "reset Password"}</Button>
    </Form>
  );
}

export default UpdateUserPasswordForm;
