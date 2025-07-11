import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import useGetImmediateSubcategories from "../../../hooks/useGetImmediateSubcategories";

export default function CategoryForm({
  showForm,
  editingCategory,
  handleSubmit,
  formData,
  handleInputChange,
  formErrors,
  setFormData,
  imagePreview,
  setImagePreview,
  cancelForm,
  categories,
  // setFormErrors,
}) {
  const [variantInputs, setVariantInputs] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const getImmediateSubcategories = useGetImmediateSubcategories(categories);
  const subcategories = getImmediateSubcategories(formData.parentCategory);

  // Initialize form data
  useEffect(() => {
    if (editingCategory) {
      // Convert variantStructure Map to plain object for React state
      const variantStructureObj = {};
      if (editingCategory.variantStructure instanceof Map) {
        for (const [key, value] of editingCategory.variantStructure) {
          variantStructureObj[key] = {
            variantOptions: value.variantOptions || [],
            options:
              value.options instanceof Map
                ? Object.fromEntries(value.options)
                : value.options || {},
          };
        }
      }

      setFormData({
        ...editingCategory,
        variantStructure: variantStructureObj,
      });

      // Initialize variant inputs
      const initialInputs = {};
      for (const [mainCat, config] of Object.entries(variantStructureObj)) {
        initialInputs[mainCat] = {};
        for (const option of config.variantOptions || []) {
          initialInputs[mainCat][option] = "";
        }
      }
      setVariantInputs(initialInputs);
    } else {
      // Reset for new category
      setFormData({
        name: "",
        description: "",
        image:
          "https://res.cloudinary.com/dz2xqjv8q/image/upload/v1698247967/eazworld/1_1_dk0l6h.jpg",
        parentCategory: null,
        status: "active",
        variantStructure: {},
      });
      setVariantInputs({});
    }
  }, [editingCategory, setFormData]);

  // Update variant options when subcategory changes
  useEffect(() => {
    if (selectedSubcategory) {
      const subcat = categories.find((cat) => cat._id === selectedSubcategory);
      console.log("Selected subcategory:", subcat);
      console.log("Subcategory variant structure:", subcat?.variantStructure);

      if (subcat) {
        // Handle variant structure regardless of its format
        let variantStructureObj = {};

        if (subcat.variantStructure) {
          console.log(
            "Variant structure type:",
            typeof subcat.variantStructure
          );
          console.log("Is Map:", subcat.variantStructure instanceof Map);

          if (subcat.variantStructure instanceof Map) {
            // Convert Map to plain object
            for (const [key, value] of subcat.variantStructure) {
              variantStructureObj[key] = {
                variantOptions: value.variantOptions || [],
                options:
                  value.options instanceof Map
                    ? Object.fromEntries(value.options)
                    : value.options || {},
              };
            }
          } else if (typeof subcat.variantStructure === "object") {
            // Handle plain object format
            variantStructureObj = subcat.variantStructure;
          }
        }

        console.log("Processed variant structure:", variantStructureObj);

        setFormData((prev) => {
          const newData = {
            ...prev,
            variantStructure: variantStructureObj,
          };
          console.log("Updated form data:", newData);
          return newData;
        });

        // Initialize inputs
        const initialInputs = {};
        for (const [mainCat, config] of Object.entries(variantStructureObj)) {
          initialInputs[mainCat] = {};
          for (const option of config.variantOptions || []) {
            initialInputs[mainCat][option] = "";
          }
        }
        console.log("Initialized variant inputs:", initialInputs);
        setVariantInputs(initialInputs);
      }
    }
  }, [selectedSubcategory, categories, setFormData]);

  const addVariantOptionValue = (mainCat, option) => {
    if (!variantInputs[mainCat]?.[option]?.trim()) return;

    setFormData((prev) => {
      const newData = { ...prev };

      if (!newData.variantStructure[mainCat]) {
        newData.variantStructure[mainCat] = {
          variantOptions: [],
          options: {},
        };
      }

      if (!newData.variantStructure[mainCat].variantOptions.includes(option)) {
        newData.variantStructure[mainCat].variantOptions.push(option);
        newData.variantStructure[mainCat].options[option] = [];
      }

      const values = [
        ...(newData.variantStructure[mainCat].options[option] || []),
        variantInputs[mainCat][option].trim(),
      ];

      newData.variantStructure[mainCat].options[option] = [...new Set(values)];

      return newData;
    });

    // Clear input
    setVariantInputs((prev) => ({
      ...prev,
      [mainCat]: {
        ...prev[mainCat],
        [option]: "",
      },
    }));
  };

  const removeVariantOptionValue = (mainCat, option, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const values = newData.variantStructure[mainCat].options[option].filter(
        (v) => v !== value
      );
      newData.variantStructure[mainCat].options[option] = values;
      return newData;
    });
  };

  const removeMainCategory = (mainCat) => {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData.variantStructure[mainCat];
      return newData;
    });

    setVariantInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[mainCat];
      return newInputs;
    });
  };

  const addNewMainCategory = () => {
    const subcat = subcategories.find((cat) => cat._id === selectedSubcategory);
    if (!subcat) return;

    setFormData((prev) => {
      const newData = { ...prev };
      if (!newData.variantStructure) {
        newData.variantStructure = {};
      }

      // Use subcategory name as the variant category name
      newData.variantStructure[subcat.name] = {
        variantOptions: [],
        options: {},
      };

      return newData;
    });

    // Initialize inputs for the new category
    setVariantInputs((prev) => ({
      ...prev,
      [subcat.name]: {},
    }));
  };

  const addNewOptionType = (mainCat) => {
    const optionName = prompt("Enter option type name:");
    if (!optionName?.trim()) return;

    setFormData((prev) => {
      const newData = { ...prev };
      if (
        !newData.variantStructure[mainCat].variantOptions.includes(optionName)
      ) {
        newData.variantStructure[mainCat].variantOptions.push(optionName);
        newData.variantStructure[mainCat].options[optionName] = [];
      }
      return newData;
    });

    // Initialize input for the new option type
    setVariantInputs((prev) => ({
      ...prev,
      [mainCat]: {
        ...prev[mainCat],
        [optionName]: "",
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Convert variantStructure to Map for database
    const formDataWithVariants = {
      ...formData,
      variantStructure: new Map(
        Object.entries(formData.variantStructure || {})
      ),
    };

    // Convert nested options Maps
    for (const [key, value] of formDataWithVariants.variantStructure) {
      console.log("key", key);
      if (value.options && typeof value.options === "object") {
        value.options = new Map(Object.entries(value.options));
      }
    }

    handleSubmit(e, formDataWithVariants);
  };

  return (
    <>
      {showForm && (
        <FormCard>
          <FormTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </FormTitle>
          <Form onSubmit={handleFormSubmit}>
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
                <PreviewImage src={imagePreview} alt="Preview" />
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
                onChange={(e) => {
                  handleInputChange(e);
                  setSelectedSubcategory("");
                }}
              >
                <option value="">None (Top Level)</option>
                {categories
                  .filter((cat) => !cat.parentCategory)
                  .filter(
                    (cat) => !editingCategory || cat._id !== editingCategory._id
                  )
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </FormSelect>
            </FormGroup>

            {formData.parentCategory && (
              <FormGroup>
                <FormLabel>Subcategory</FormLabel>
                <FormSelect
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat._id} value={subcat._id}>
                      {subcat.name}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
            )}

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

            {/* Variant Options Section */}
            {selectedSubcategory && formData.parentCategory && (
              <VariantSection>
                <SectionTitle>
                  Variant Options for{" "}
                  {
                    subcategories.find((cat) => cat._id === selectedSubcategory)
                      ?.name
                  }
                </SectionTitle>
                <SectionDescription>
                  Define variant types and their options for this subcategory
                </SectionDescription>

                {Object.keys(formData.variantStructure || {}).length === 0 ? (
                  <div>
                    <p>No variant structure defined for this subcategory.</p>
                    <AddMainCategoryButton
                      type="button"
                      onClick={addNewMainCategory}
                    >
                      <FaPlus /> Add Main Category
                    </AddMainCategoryButton>
                  </div>
                ) : (
                  Object.entries(formData.variantStructure).map(
                    ([mainCat, config]) => (
                      <VariantTypeGroup key={mainCat}>
                        <VariantTypeHeader>
                          <VariantTypeTitle>{mainCat}</VariantTypeTitle>
                          <RemoveButton
                            onClick={() => removeMainCategory(mainCat)}
                          >
                            <FaTrash />
                          </RemoveButton>
                        </VariantTypeHeader>

                        {config.variantOptions.map((option) => (
                          <OptionGroup key={option}>
                            <OptionLabel>{option}</OptionLabel>
                            <OptionInputGroup>
                              <OptionInput
                                type="text"
                                value={variantInputs[mainCat]?.[option] || ""}
                                onChange={(e) =>
                                  setVariantInputs((prev) => ({
                                    ...prev,
                                    [mainCat]: {
                                      ...prev[mainCat],
                                      [option]: e.target.value,
                                    },
                                  }))
                                }
                                placeholder={`Add ${option} value`}
                              />
                              <AddButton
                                type="button"
                                onClick={() =>
                                  addVariantOptionValue(mainCat, option)
                                }
                              >
                                <FaPlus />
                              </AddButton>
                            </OptionInputGroup>

                            {config.options[option]?.length > 0 && (
                              <OptionsList>
                                {config.options[option].map((value) => (
                                  <OptionItem key={value}>
                                    {value}
                                    <RemoveButton
                                      onClick={() =>
                                        removeVariantOptionValue(
                                          mainCat,
                                          option,
                                          value
                                        )
                                      }
                                    >
                                      <FaTrash />
                                    </RemoveButton>
                                  </OptionItem>
                                ))}
                              </OptionsList>
                            )}
                          </OptionGroup>
                        ))}

                        <AddOptionTypeButton
                          type="button"
                          onClick={() => addNewOptionType(mainCat)}
                        >
                          <FaPlus /> Add Option Type
                        </AddOptionTypeButton>
                      </VariantTypeGroup>
                    )
                  )
                )}
              </VariantSection>
            )}

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

// Styled Components
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
  grid-column: ${(props) => (props.$fullWidth ? "span 2" : "auto")};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
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

const PreviewImage = styled.img`
  max-width: 100px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
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

const VariantSection = styled.div`
  grid-column: span 2;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const VariantTypeGroup = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
`;

const VariantTypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const VariantTypeTitle = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #c82333;
  }
`;

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e5e7eb;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const OptionLabel = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const OptionInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #3a5af5;
  }
`;

const AddOptionTypeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  color: #4a6cf7;
  border: 1px dashed #4a6cf7;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(74, 108, 247, 0.1);
    border-style: solid;
  }
`;

const AddMainCategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #10b981;
  border: 1px dashed #10b981;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(16, 185, 129, 0.1);
    border-style: solid;
  }
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 0.5rem;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;
