// SelectField.jsx
import React from 'react';

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="input"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;