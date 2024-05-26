import React, { useState, useEffect } from "react";
import "../components/HoraInput.css"; // Asegúrate de que la ruta sea correcta

const HorarioInput = ({
  label,
  name,
  hora,
  minutos,
  esrequerido,
  onChange,
}) => {
  const [required, setRequired] = useState(esrequerido);
  useEffect(() => {
    setRequired(esrequerido);
  }, [esrequerido]);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    // console.log("handleCheckboxChange", e.target);
    setRequired(isChecked);
    // Reiniciar valores de hora y minutos si se desmarca el checkbox
    if (!isChecked) {
      onChange({ target: { name: `${name}Hora`, value: "-" } });
      onChange({ target: { name: `${name}Minutos`, value: "-" } });
    }
    onChange({ target: { name: `${name}Requerido`, value: isChecked } });
  };

  const handleSelectChange = (e) => {
    onChange(e);
  };

  // Generar opciones de hora
  const horasOptions = [
    <option key="-" value="-">
      -
    </option>,
    ...Array.from({ length: 24 }, (_, i) => (
      <option key={i} value={i}>
        {i < 10 ? `0${i}` : i}
      </option>
    )),
  ];

  // Opciones fijas para minutos
  const minutosOptions = ["-", 0, 15, 30, 45].map((minuto) => (
    <option key={minuto} value={minuto}>
      {minuto < 10 && minuto !== "-" ? `0${minuto}` : minuto}
    </option>
  ));

  // IDs únicos para los selectores
  const horaId = `${name}Hora`;
  const minutosId = `${name}Minutos`;

  return (
    <div className="horario-input-group">
      {label && (
        <label htmlFor={horaId} className="horario-input-label">
          {label}
        </label>
      )}
      <div>
        <input
          type="checkbox"
          checked={required}
          onChange={handleCheckboxChange}
        />
        <label>Agregar horario</label>
      </div>
      <div className="horario-container">
        <select
          id={horaId}
          name={`${name}Hora`}
          value={hora || "-"}
          onChange={handleSelectChange}
          className="horario-select"
          required={required}
        >
          {horasOptions}
        </select>
        <span className="class-dos-puntos">:</span>{" "}
        <select
          id={minutosId}
          name={`${name}Minutos`}
          value={minutos || "-"}
          onChange={handleSelectChange}
          className="horario-select"
          required={required}
        >
          {minutosOptions}
        </select>
      </div>
    </div>
  );
};

export default HorarioInput;
