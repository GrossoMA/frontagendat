import React, { useState } from "react";

const ImageUpload = ({ onImageUpload, fieldName, texto }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onImageUpload(file, fieldName); // Llama a la función de callback con el archivo y el nombre del campo
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-group row align-items-center">
      <label htmlFor={fieldName} className="col-sm-2 col-form-label">
        {texto}
      </label>
      <div className="col-sm-10">
        <input
          type="file"
          accept="image/*"
          className="form-control-file"
          id={fieldName}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Vista previa"
            style={{ width: "100%", maxHeight: "300px", marginTop: "10px" }}
          />
        )}
      </div>
      {/* <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Vista previa"
          style={{ width: "100%", maxHeight: "300px" }}
        />
      )} */}
    </div>
  );
};

export default ImageUpload;
