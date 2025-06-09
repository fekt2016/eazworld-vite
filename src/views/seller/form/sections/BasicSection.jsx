import { useFormContext } from "react-hook-form";

const BasicSection = ({ mode }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="form-grid">
        {mode === "add" && <input type="hidden" {...register("seller")} />}
        <div className="form-group">
          <label>Product Name *</label>
          <input
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label>Short Description *</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicSection;
