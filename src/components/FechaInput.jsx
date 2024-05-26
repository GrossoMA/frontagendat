import React from "react";

// Componente de entrada de fecha reutilizable min max format  YYYY-MM-DD
const FechaInput = ({
  label,
  name,
  value = "",
  //handleFechaInicioChange,
  onChange,
  placeholder,
  minDate,
  maxDate,
}) => {
  return (
    <div className="form-group input-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={minDate} // Fecha mínima seleccionable
        max={maxDate} // Fecha máxima seleccionable
        className="input"
      />
    </div>
  );
};

export default FechaInput;
