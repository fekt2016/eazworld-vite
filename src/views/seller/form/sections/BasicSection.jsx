import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const BasicSection = ({ mode }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormGrid>
        {mode === "add" && <input type="hidden" {...register("seller")} />}
        <FormGroup>
          <Label>Product Name *</Label>
          <Input
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Short Description *</Label>
          <TextArea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe your product..."
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </FormGroup>
      </FormGrid>
    </>
  );
};

export default BasicSection;
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
`;
