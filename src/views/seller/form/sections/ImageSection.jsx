import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ImageSection({
  isSubmitting,

  mode,
  initialData,
}) {
  const { watch, setValue } = useFormContext();

  const [coverPreview, setCoverPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // Handle cover image preview
      if (initialData.imageCover) {
        setCoverPreview(initialData.imageCover);
      }

      // Handle additional images preview
      if (initialData.images && initialData.images.length > 0) {
        setImagePreviews(initialData.images);
      }
    }
  }, [initialData, mode]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [coverPreview, imagePreviews]);

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setValue("imageCover", file);
    }
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    const existingImages = watch("images") || [];
    setValue("images", [...existingImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      watch("images").filter((_, i) => i !== index)
    );
  };
  return (
    <>
      <div className="form-section">
        <h3>Product Images</h3>
        <div className="form-group">
          <label>Cover Image *</label>
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImage}
              disabled={isSubmitting}
            />

            {coverPreview && (
              <img
                style={{ height: "20rem" }}
                src={coverPreview}
                alt="Cover preview"
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Additional Images</label>
          <div className="image-upload-container">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAdditionalImages}
              disabled={isSubmitting}
            />
            <div
              style={{ display: "flex", backgroundColor: "white" }}
              className="image-previews"
            >
              {imagePreviews.map((preview, index) => (
                <div
                  style={{
                    position: "relative",
                    borderRadius: "7px",
                    margin: "5px",
                  }}
                  key={index}
                  className="image-preview"
                >
                  <img
                    style={{ height: "15rem" }}
                    src={preview}
                    alt={`Product ${index}`}
                  />
                  <button
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      position: "absolute",
                      right: "2px",
                      top: "2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    disabled={isSubmitting}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
