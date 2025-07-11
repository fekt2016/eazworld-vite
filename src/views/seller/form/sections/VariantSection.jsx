import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export default function VariantSection({
  localVariants,
  setLocalVariants,
  isSubmitting,
}) {
  const { register } = useFormContext();

  const totalStock = useMemo(() => {
    return localVariants.reduce(
      (acc, variant) => acc + (parseInt(variant.stock) || 0),
      0
    );
  }, [localVariants]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setLocalVariants(updatedVariants);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...localVariants];
    updatedVariants.splice(index, 1);
    setLocalVariants(updatedVariants);
  };

  if (localVariants.length === 0) return null;

  return (
    <SectionContainer>
      <SectionTitle>Product Variants</SectionTitle>
      <VariantTable>
        <thead>
          <tr>
            <TableHeader>Attributes</TableHeader>
            <TableHeader>SKU</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Stock</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {localVariants.map((variant, index) => (
            <tr key={index}>
              <TableCell>
                <VariantAttributes>
                  {Object.entries(variant).map(([key, value]) => {
                    if (["price", "stock", "sku"].includes(key)) return null;
                    return (
                      <AttributeItem key={key}>
                        <AttributeName>{key}:</AttributeName>
                        <AttributeValue>{value}</AttributeValue>
                      </AttributeItem>
                    );
                  })}
                </VariantAttributes>
              </TableCell>
              <TableCell>
                <SKUDisplay>{variant.sku}</SKUDisplay>
              </TableCell>
              <TableCell>
                <PriceInput
                  type="number"
                  {...register(`variants.${index}.price`)}
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  disabled={isSubmitting}
                  min="0"
                  step="0.01"
                  placeholder="Price"
                />
              </TableCell>
              <TableCell>
                <StockInput
                  type="number"
                  {...register(`variants.${index}.stock`)}
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  disabled={isSubmitting}
                  min="0"
                  placeholder="Stock"
                />
              </TableCell>
              <TableCell>
                <RemoveVariantButton
                  type="button"
                  onClick={() => removeVariant(index)}
                  disabled={isSubmitting}
                >
                  Remove
                </RemoveVariantButton>
              </TableCell>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TotalStockLabel colSpan="3">Total Stock:</TotalStockLabel>
            <TotalStockValue>{totalStock}</TotalStockValue>
            <td></td>
          </tr>
        </tfoot>
      </VariantTable>
    </SectionContainer>
  );
}

// Styled Components
const SectionContainer = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f9fafb;
  border: 1px solid #e2e8f0;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const VariantTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #edf2f7;
  border-bottom: 2px solid #e2e8f0;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const VariantAttributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AttributeItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AttributeName = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const AttributeValue = styled.span`
  color: #2d3748;
`;

const SKUDisplay = styled.div`
  padding: 0.5rem;
  background: #edf2f7;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const StockInput = styled(PriceInput)``;

const RemoveVariantButton = styled.button`
  padding: 0.75rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c53030;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const TotalStockLabel = styled.td`
  font-weight: 600;
  color: #2d3748;
  background: #f7fafc;
  border-top: 2px solid #e2e8f0;
  padding: 1rem;
`;

const TotalStockValue = styled.td`
  font-weight: 700;
  color: #3182ce;
  background: #f7fafc;
  border-top: 2px solid #e2e8f0;
  padding: 1rem;
`;
