import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function PricingSection({ isSubmitting }) {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const price = watch("price");

  useEffect(() => {
    if (price !== undefined) {
      trigger("discountPrice");
    }
  }, [price, trigger]);
  return (
    <div className="form-section">
      <h3>Pricing</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            disabled={isSubmitting}
          />
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="discount">discountPrice</label>
          <input
            type="number"
            step="0.01"
            {...register("discountPrice", {
              validate: (value) => {
                const price = parseFloat(watch("price"));
                return (
                  !value ||
                  value < price ||
                  "Discount must be less than regular price"
                );
              },
            })}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="discount">Discount Price</label>
          <input
            id="discount"
            type="number"
            step="0.01"        
            {...register("discountPrice", {
              // validate: (value) => {
              //   return (
              //     !value ||
              //     value < watch("price") ||
              //     "Discount must be less than regular price"
              //   );
              // },
            })}
            disabled={isSubmitting}
          />
          {errors.discountPrice && (
            <span className="error">{errors.discountPrice.message}</span>
          )}
        </div> */}
      </div>
    </div>
  );
}
