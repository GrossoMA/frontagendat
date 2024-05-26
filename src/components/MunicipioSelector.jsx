// MunicipioSelector.jsx
import React, { useState } from "react";
import SelectField from "./SelectField";

function MunicipioSelector({
  municipiosYLocalidades,
  municipioSeleccionado,
  // handleMunicipioChange,
  onChange,
}) {
  // Convertir la estructura de datos para que se ajuste a lo esperado por SelectField
  const municipiosOptions = municipiosYLocalidades.map((municipioObj) => ({
    label: municipioObj.municipio, // Texto que el usuario ve
    value: municipioObj.municipio, // Valor interno usado en el formulario
  }));

  return (
    <div>
      <SelectField
        label="Municipio"
        name="municipio"
        value={municipioSeleccionado}
        onChange={onChange}
        // handleMunicipioChange}
        options={municipiosOptions}
      />
    </div>
  );
}

export default MunicipioSelector;
