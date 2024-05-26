// TextAreaField.jsx
import React from "react";

const TextAreaField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="form-group">      
      {label && <label className="form-label">{label}</label>}
      
        <textarea    
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}          
          rows="5" // Puedes ajustar el número de líneas iniciales
        ></textarea>
      
    </div>
  );
};

export default TextAreaField;
