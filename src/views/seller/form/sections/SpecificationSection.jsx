import { useFieldArray, useFormContext } from "react-hook-form";

export default function SpecificationSection({
  isSubmitting,
  // materialFields,
  // removeMaterial,
  // appendMaterial,
}) {
  const { register } = useFormContext();

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    name: "specifications.material",
  });

  return (
    <div className="form-section">
      <h3>Specifications</h3>

      {/* Materials Section */}
      <div className="nested-section">
        <h4>Materials</h4>
        {materialFields.map((item, index) => (
          <div key={item.id} className="spec-group">
            <div className="form-grid">
              <div className="form-group">
                <input
                  {...register(`specifications.material.${index}.value.0`)}
                  placeholder="Material name 1"
                  disabled={isSubmitting}
                />
                <input
                  {...register(`specifications.material.${index}.value.1`)}
                  placeholder="Material name 2"
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="color"
                  {...register(`specifications.material.${index}.hexCode`)}
                  disabled={isSubmitting}
                  style={{ width: "40px" }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeMaterial(index)}
              disabled={isSubmitting}
            >
              Remove Material
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendMaterial({ value: [""], hexCode: "#000000" })}
          disabled={isSubmitting}
        >
          + Add Material
        </button>
      </div>

      {/* Weight */}
      <div className="form-group">
        <input
          {...register("specifications.weight")}
          placeholder="Weight (e.g., 500g)"
          disabled={isSubmitting}
        />
      </div>

      {/* Dimension */}
      <div className="form-group">
        <input
          {...register("specifications.dimension")}
          placeholder="Dimension (e.g., 20x30x5cm)"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
