import React, { useState } from "react";
import BotonSelector from "./BotonSelector"; // Asegúrate de que la ruta sea correcta
import "../components/BotonSelector.css"; // Importa los estilos si es necesario

// Componente para seleccionar palabras claves
function PalabrasClavesSelector({
  palabrasClaves,
  selectedKeywords,
  onSelectKeyword,
  onDeselectKeyword,
  onChange,
}) {
  // Estado para gestionar las palabras claves seleccionadas
  // const [seleccionadas, setSeleccionadas] = useState([]);
  const [estaSeleccionado, setEstaSeleccionado] = useState(false);
  // const estiloFinal = `botonSelector ${
  //   estaSeleccionado     ? "botonSelectorSeleccionado"
  //     : "botonSelectorNoSeleccionado"
  // }`;

  // Manejador para agregar o quitar una palabra clave de la selección
  // const toggleSeleccion = (palabra) => {
  //   setSeleccionadas(
  //     (prev) =>
  //       prev.includes(palabra)         ? prev.filter((p) => p !== palabra) // Si ya está, la quitamos
  //         : [...prev, palabra] // Si no está, la agregamos
  //   );
  // };
  const handleKeywordClick = (palabra) => {
    if (selectedKeywords.includes(palabra)) {
      onDeselectKeyword(palabra);
      setEstaSeleccionado(false);
    } else {
      onSelectKeyword(palabra);
      setEstaSeleccionado(true);
    }
  };

  //   return (
  //     <div className="selector-palabras-claves">
  //       {palabrasClaves.map((palabra) => (
  //         <button
  //           className={estiloFinal}
  //           key={palabra}
  //           // estaSeleccionado={seleccionadas.includes(palabra)}
  //           onClick={() => handleKeywordClick(palabra)}
  //         >
  //           {palabra}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // }
  return (
    <div className="selector-palabras-claves">
      {palabrasClaves.map((palabra) => {
        const estaSeleccionado = selectedKeywords.includes(palabra);
        const estiloFinal = `botonSelector ${
          estaSeleccionado
            ? "botonSelectorSeleccionado"
            : "botonSelectorNoSeleccionado"
        }`;

        return (
          <button
            className={estiloFinal}
            key={palabra}
            onClick={() => handleKeywordClick(palabra)}
          >
            {palabra}
          </button>
        );
      })}
    </div>
  );
}

export default PalabrasClavesSelector;
