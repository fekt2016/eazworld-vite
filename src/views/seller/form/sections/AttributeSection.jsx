import { useFieldArray, useFormContext } from "react-hook-form";

export default function AttributeSection({
  isSubmitting,
  // attrs,
  // removeAttr,
  // appendAttr,
}) {
  const { register } = useFormContext();

  const {
    fields: attrs,
    append: appendAttr,
    remove: removeAttr,
  } = useFieldArray({
    // control,
    name: "attributes",
  });
  return (
    <div className="form-section">
      <h3>Attributes</h3>
      {attrs.map((attr, index) => (
        <div key={attr.id} className="attr-group">
          <div className="form-grid">
            <div className="form-group">
              <input
                {...register(`attributes.${index}.name`)}
                placeholder="Attribute name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input
                {...register(`attributes.${index}.value`)}
                placeholder="Attribute value"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeAttr(index)}
            disabled={isSubmitting}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendAttr({ name: "", value: "" })}
        disabled={isSubmitting}
      >
        + Add Attribute
      </button>
    </div>
  );
}
