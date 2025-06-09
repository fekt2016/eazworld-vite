import styled from "styled-components";

export default function CategoryForm({
  showForm,
  editingCategory,
  handleSubmit,
  formData,
  handleInputChange,
  formErrors,
  setFormData,
  imagePreview,
  topLevelCategories,
  setImagePreview,
  cancelForm,
}) {
  return (
    <>
      {showForm && (
        <FormCard>
          <FormTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Category Name *</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                $error={!!formErrors.name}
              />
              {formErrors.name && <ErrorText>{formErrors.name}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Description *</FormLabel>
              <FormTextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                $error={!!formErrors.description}
              />
              {formErrors.description && (
                <ErrorText>{formErrors.description}</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Category Image</FormLabel>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100px", marginBottom: "10px" }}
                />
              )}
              <FormInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const file = e.target.files[0];
                    setFormData((prev) => ({ ...prev, image: file }));
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Parent Category</FormLabel>
              <FormSelect
                name="parentCategory"
                value={formData.parentCategory || ""}
                onChange={handleInputChange}
              >
                <option value="">None (Top Level)</option>
                {topLevelCategories
                  .filter(
                    (cat) => !editingCategory || cat.id !== editingCategory.id
                  )
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Status</FormLabel>
              <StatusContainer>
                <StatusOption
                  $active={formData.status === "Active"}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "Active" }))
                  }
                >
                  Active
                </StatusOption>
                <StatusOption
                  $active={formData.status === "Inactive"}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "Inactive" }))
                  }
                >
                  Inactive
                </StatusOption>
              </StatusContainer>
            </FormGroup>

            <FormActions>
              <SecondaryButton type="button" onClick={cancelForm}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                {editingCategory ? "Update Category" : "Create Category"}
              </PrimaryButton>
            </FormActions>
          </Form>
        </FormCard>
      )}
    </>
  );
}
const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.95rem;
  color: #34495e;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 0.9rem;
  border: 1px solid ${(props) => (props.$error ? "#e74c3c" : "#ddd")};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const FormTextArea = styled.textarea`
  padding: 0.9rem;
  border: 1px solid ${(props) => (props.$error ? "#e74c3c" : "#ddd")};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const FormSelect = styled.select`
  padding: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.3rem;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatusOption = styled.div`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${(props) => (props.$active ? "#27ae60" : "#ddd")};
  background-color: ${(props) =>
    props.$active ? "rgba(39, 174, 96, 0.1)" : "white"};
  color: ${(props) => (props.$active ? "#27ae60" : "#7f8c8d")};
  font-weight: ${(props) => (props.$active ? "500" : "normal")};

  &:hover {
    border-color: ${(props) => (props.$active ? "#219653" : "#3498db")};
    background-color: ${(props) =>
      props.$active ? "rgba(33, 150, 83, 0.15)" : "#f8f9fa"};
  }
`;

const FormActions = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const PrimaryButton = styled.button`
  padding: 0.8rem 1.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
`;

const SecondaryButton = styled.button`
  padding: 0.8rem 1.8rem;
  background-color: white;
  color: #7f8c8d;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #bbb;
  }
`;
