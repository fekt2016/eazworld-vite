import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { lastName: currentLastName, firstName: currentFirstName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [lastName, setLastName] = useState(currentLastName);
  const [firstName, setFirstName] = useState(currentFirstName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!lastName && !firstName) return;
    updateUser(
      { lastName, firstName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="email">
        <Input disabled value={email} type="email" id="email" />
      </FormRow>
      <FormRow label="First Name">
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Last Name">
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button>{isUpdating ? <SpinnerMini /> : "Update account"}</Button>
        <Button>update</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
