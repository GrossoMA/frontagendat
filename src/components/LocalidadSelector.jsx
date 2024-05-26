// LocalidadSelector.jsx
import React, { useState, useEffect } from "react";
import SelectField from "./SelectField";

function LocalidadSelector({
  localidadesMunicipio,
  localidadSeleccionada,
  //handleLocalidadChange,
  onChange,
}) {
  // Convertir las localidades filtradas en opciones para el componente SelectField
  const localidadOptions = localidadesMunicipio.map((localidad) => ({
    label: localidad,
    value: localidad,
  }));

  return (
    <div>
      <SelectField
        label="Localidad"
        name="localidad"
        value={localidadSeleccionada}
        onChange={onChange}
        // handleLocalidadChange}
        options={localidadOptions}
      />
    </div>
  );
}

export default LocalidadSelector;
