import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useUser } from "./useUser";
import { useState } from "react";
import { useCreateVerify } from "../settings/useCreateVerify";
import SpinnerMini from "../../ui/SpinnerMini";
import FileInput from "../../ui/FileInput";

function VerificationForm() {
  const [userId, setUserId] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [selfie, setSelfie] = useState("");
  const [selfieId, setSelfieId] = useState("");

  const { user } = useUser();
  console.log(user.id);

  const { createVerify, isCreating } = useCreateVerify();

  function handleSubmit(e) {
    console.log(userId, photoId, selfie, selfieId);
    e.preventDefault();
    if (!photoId) return;

    createVerify({ userId, photoId, selfie, selfieId });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="hidden"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <FormRow label="Select Valid National ID">
        <FileInput
          type="file"
          id="photoId"
          accept="image/*"
          onChange={(e) => setPhotoId(e.target.files[0])}
        />
      </FormRow>
      <FormRow label="Select Selfie With National ID">
        <FileInput
          type="file"
          id="selfie"
          accept="image/*"
          onChange={(e) => setSelfie(e.target.files[0])}
        />
      </FormRow>
      <FormRow label="Select Selfie Paper Verification">
        <FileInput
          type="file"
          id="selfieId"
          accept="image/*"
          onChange={(e) => setSelfieId(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button>{isCreating ? <SpinnerMini /> : "Add Wallet"}</Button>
      </FormRow>
    </Form>
  );
}

export default VerificationForm;
