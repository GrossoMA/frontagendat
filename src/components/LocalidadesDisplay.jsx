// LocalidadesDisplay.jsx
import React, { useState, useEffect } from 'react';

function LocalidadesDisplay({ selectedMunicipio, municipiosData }) {
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    // Filtrar las localidades basadas en el municipio seleccionado
    const localidadesFiltradas = municipiosData
      .filter((municipio) => municipio.Municipio === selectedMunicipio)
      .map((municipio) => municipio.Localidad);

    setLocalidades(localidadesFiltradas);
  }, [selectedMunicipio, municipiosData]);

  return (
    <div>
      <h3>Localidades en {selectedMunicipio}:</h3>
      <ul>
        {localidades.map((localidad) => (
          <li key={localidad}>{localidad}</li>
        ))}
      </ul>
    </div>
  );
}

export default LocalidadesDisplay;