import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { generateSKU } from "../../../../utils/helpers";
import isEqual from "lodash.isequal"; // Add this import

export default function VariantSection({
  localVariants,
  setLocalVariants,
  setSelectedOptions,
  selectedOptions,
  productCategories,
  selectedCategoryType,
  currentUser,
  initialData,
  mode,
}) {
  const { register, setValue } = useFormContext();
  const deepEqual = useCallback((a, b) => isEqual(a, b), []);

  const [variantTypes, setVariantTypes] = useState([]);

  const stableSetVariantTypes = useCallback(setVariantTypes, [setVariantTypes]);

  const stableProductCategories = useMemo(
    () => productCategories,
    [productCategories]
  );

  const cartesianProduct = useCallback((arrays) => {
    return arrays
      .reduce(
        (acc, current) => acc.flatMap((a) => current.map((c) => [...a, c])),
        [[]]
      )
      .filter((comb) => comb.length > 0);
  }, []);
  const totalStock = useMemo(() => {
    return localVariants.reduce(
      (sum, variant) => sum + (Number(variant.stock) || 0),
      0
    );
  }, [localVariants]);
  useEffect(() => {
    setValue("variants", localVariants);
  }, [localVariants, setValue]);

  useEffect(() => {
    setValue("totalStock", totalStock);
  }, [setValue, totalStock]);
  useEffect(() => {
    if (mode === "edit" && initialData?.variants?.length > 0) {
      setLocalVariants(initialData.variants);

      // Initialize selected options after variantTypes are set
      const initialOptions = {};
      variantTypes.forEach((type) => {
        initialOptions[type] = [
          ...new Set(initialData.variants.map((v) => v[type]).values()),
        ].filter(Boolean);
      });
      setSelectedOptions(initialOptions);
    }
  }, [mode, initialData, variantTypes, setLocalVariants, setSelectedOptions]); // Added variantTypes dep

  useEffect(() => {
    if (selectedCategoryType) {
      const variantOptions =
        productCategories[selectedCategoryType]?.variantOptions || [];
      stableSetVariantTypes(variantOptions);
    } else {
      stableSetVariantTypes([]);
    }
  }, [selectedCategoryType, productCategories, stableSetVariantTypes]);

  useEffect(() => {
    const generateVariants = () => {
      const generateVariantSKUs = (combination) => {
        return generateSKU({
          user: currentUser,
          category: selectedCategoryType,
          variants: variantTypes.reduce((acc, type, index) => {
            acc[type] = combination[index];
            return acc;
          }, {}),
        });
      };

      const selectedOptionsArrays = variantTypes.map(
        (type) => selectedOptions[type] || []
      );

      if (selectedOptionsArrays.every((arr) => arr.length === 0)) {
        if (mode === "add") setLocalVariants([]);
        return;
      }

      const combinations = cartesianProduct(selectedOptionsArrays);

      setLocalVariants((prevVariants) => {
        const newVariants = combinations.map((combination) => {
          const existingVariant = prevVariants.find((variant) =>
            variantTypes.every(
              (type) =>
                variant[type] === combination[variantTypes.indexOf(type)]
            )
          );

          return {
            price: existingVariant?.price || 0,
            stock: existingVariant?.stock || 0,
            sku: existingVariant?.sku || generateVariantSKUs(combination),
            ...variantTypes.reduce((acc, type, index) => {
              acc[type] = combination[index];
              return acc;
            }, {}),
          };
        });

        if (mode === "edit") {
          const existingCombinations = new Set(
            newVariants.map((v) =>
              variantTypes.map((type) => v[type]).join("|")
            )
          );

          const mergedVariants = [
            ...newVariants,
            ...prevVariants.filter(
              (v) =>
                !existingCombinations.has(
                  variantTypes.map((type) => v[type]).join("|")
                )
            ),
          ];

          if (!deepEqual(mergedVariants, prevVariants)) {
            return mergedVariants;
          }
          return prevVariants;
        } else {
          return newVariants;
        }
      });
    };

    if (
      mode === "add" ||
      (mode === "edit" && Object.keys(selectedOptions).length > 0)
    ) {
      generateVariants();
    }
  }, [
    selectedOptions,
    selectedCategoryType,
    variantTypes,
    currentUser,
    mode,
    cartesianProduct,
    setLocalVariants,
    deepEqual,
  ]);

  const handleRemoveVariant = (index) => {
    const updatedVariants = localVariants.filter((_, i) => i !== index);
    setLocalVariants(updatedVariants);
  };
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setLocalVariants(updatedVariants);
    setValue("variants", updatedVariants); // Direct form update
  };
  const toggleOption = useCallback(
    (type, option) => {
      setSelectedOptions((prev) => {
        const newOptions = prev[type]?.includes(option)
          ? prev[type].filter((v) => v !== option)
          : [...(prev[type] || []), option];

        // Prevent unnecessary updates
        return deepEqual(prev[type], newOptions)
          ? prev
          : {
              ...prev,
              [type]: newOptions,
            };
      });
    },
    [setSelectedOptions, deepEqual]
  );
  return (
    <FormSection>
      {variantTypes.length > 0 && (
        <div>
          <SectionTitle>Product Variants</SectionTitle>

          {/* Variant Options - Shown in both modes */}
          <div className="variant-options">
            {variantTypes.map((variantType) => {
              return (
                <div key={variantType} className="variant-option-group">
                  <div className="variant-type-header">
                    {variantType.charAt(0).toUpperCase() + variantType.slice(1)}
                    Options
                  </div>
                  <div className="option-grid">
                    {stableProductCategories[selectedCategoryType]?.[
                      `${variantType}Options`
                    ]?.map((option) => (
                      <div
                        key={`${variantType}-${option}`}
                        className="option-item"
                      >
                        <input
                          type="checkbox"
                          id={`${variantType}-${option}`}
                          checked={selectedOptions[variantType]?.includes(
                            option
                          )}
                          onChange={() => toggleOption(variantType, option)}
                        />
                        <label htmlFor={`${variantType}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <VariantTable>
            <thead>
              <tr>
                {variantTypes.map((type) => (
                  <th key={type}>{type.toUpperCase()}</th>
                ))}
                <th>Price</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {localVariants.map((variant, index) => (
                <tr key={variant.id || index}>
                  {variantTypes.map((type) => (
                    <td key={`${variant.id}-${type}`}>{variant[type]}</td>
                  ))}
                  <td>
                    <input
                      type="number"
                      value={Number(variant.price) ?? 0}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={Number(variant.stock) ?? 0}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "stock",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={variant.sku || ""}
                      onChange={(e) =>
                        handleVariantChange(index, "sku", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <div className="form-group">
              <label>Total Stock</label>
              <input
                type="number"
                {...register("totalStock")}
                disabled
                // value={watch("totalStock") || ""}
              />
            </div>
          </VariantTable>
        </div>
      )}
    </FormSection>
  );
}
const FormSection = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: #f9fafb;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 1.5rem;
`;

const VariantTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 12px;
    border: 1px solid #eee;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100px;
  }
`;
