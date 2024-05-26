// TipoEventoSelector.jsx
import React from "react";
import SelectField from "./SelectField";

function TipoEventoSelector({
  tiposEventosArray,
  tipoEventoSeleccionado,
  handleTipoEventoChange,
}) {
  // Convertir la estructura de datos para que se ajuste a lo esperado por SelectField
  const eventosTiposOptions = tiposEventosArray.map((eventoTipo) => ({
    label: eventoTipo, // Texto que el usuario ve
    value: eventoTipo, // Valor interno usado en el formulario
  }));

  return (
    <div>
      <SelectField
        label="Tipo Evento"
        name="tipoEvento"
        value={tipoEventoSeleccionado}
        onChange={handleTipoEventoChange}
        options={eventosTiposOptions}
      />
    </div>
  );
}

export default TipoEventoSelector;
