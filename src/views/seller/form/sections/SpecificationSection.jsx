import { useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";

export default function SpecificationSection({ isSubmitting }) {
  const { register } = useFormContext();

  // For key-value specifications
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    name: "specifications.keyValuePairs",
  });

  return (
    <SpecSectionContainer>
      <SectionHeader>
        <SectionTitle>
          <FaInfoCircle style={{ marginRight: "10px" }} />
          Product Specifications
        </SectionTitle>
        <SectionDescription>
          Provide detailed information about your product to help customers make
          informed decisions.
        </SectionDescription>
      </SectionHeader>

      <SpecGrid>
        {/* Key-Value Specifications */}
        <Subsection>
          <SubsectionTitle>Product Details</SubsectionTitle>
          <SubsectionDescription>
            Add key specifications like dimensions, weight, warranty, etc.
          </SubsectionDescription>

          <SpecTable>
            <thead>
              <tr>
                <TableHeader width="45%">Specification Name</TableHeader>
                <TableHeader width="45%">Value</TableHeader>
                <TableHeader width="10%">Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {specFields.map((item, index) => (
                <tr key={item.id}>
                  <TableCell>
                    <SpecInput
                      {...register(`specifications.keyValuePairs.${index}.key`)}
                      placeholder="e.g., Weight, Dimensions"
                      disabled={isSubmitting}
                    />
                  </TableCell>
                  <TableCell>
                    <SpecInput
                      {...register(
                        `specifications.keyValuePairs.${index}.value`
                      )}
                      placeholder="e.g., 500g, 20x30x5cm"
                      disabled={isSubmitting}
                    />
                  </TableCell>
                  <TableCell>
                    <RemoveButton
                      type="button"
                      onClick={() => removeSpec(index)}
                      disabled={isSubmitting}
                    >
                      <FaTrash />
                    </RemoveButton>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </SpecTable>

          <AddButton
            type="button"
            onClick={() => appendSpec({ key: "", value: "" })}
            disabled={isSubmitting}
          >
            <FaPlus /> Add Specification
          </AddButton>
        </Subsection>

        {/* About This Item */}
        <Subsection>
          <SubsectionTitle>About This Item</SubsectionTitle>
          <SubsectionDescription>
            Describe key features, benefits, and what makes this product
            special.
          </SubsectionDescription>
          <TextArea
            {...register("specifications.about")}
            placeholder="Enter detailed description about the product..."
            disabled={isSubmitting}
            rows={8}
          />
        </Subsection>
      </SpecGrid>
    </SpecSectionContainer>
  );
}

// Styled Components
const SpecSectionContainer = styled.div`
  margin: 2.5rem 0;
  padding: 2.5rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const SectionDescription = styled.p`
  color: #718096;
  font-size: 1.05rem;
  margin: 0;
  max-width: 800px;
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const Subsection = styled.div`
  padding: 1.8rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const SubsectionTitle = styled.h4`
  font-size: 1.3rem;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubsectionDescription = styled.p`
  color: #718096;
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
`;

const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #edf2f7;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #2d3748;
  width: ${(props) => props.width || "auto"};
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
`;

const SpecInput = styled.input`
  width: 100%;
  padding: 0.85rem 1.2rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 180px;
  background: white;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.7rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
  width: fit-content;

  &:hover {
    background: #2b6cb0;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const RemoveButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #c53030;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;
