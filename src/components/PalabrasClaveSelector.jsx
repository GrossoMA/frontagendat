import React, { useState } from "react";
// import "../components/BotonSelector.css"; // Importa los estilos si es necesario

// Componente para seleccionar palabras claves
function PalabrasClavesSelector({
  palabrasClaves,
  selectedKeywords,
  onSelectKeyword,
  onDeselectKeyword,
}) {
  const [estaSeleccionado, setEstaSeleccionado] = useState(false);

  // const handleKeywordClick = (palabra) => {
  //   if (selectedKeywords.includes(palabra)) {
  //     onDeselectKeyword(palabra);
  //     setEstaSeleccionado(false);
  //   } else {
  //     onSelectKeyword(palabra);
  //     setEstaSeleccionado(true);
  //   }
  // };
  const handleKeywordClick = (palabra) => {
    if (selectedKeywords.includes(palabra)) {
      onDeselectKeyword(palabra);
    } else {
      onSelectKeyword(palabra);
    }
  };

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
            type="button"
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

//   return (
//     <div className="selector-palabras-claves">
//       {palabrasClaves.map((palabra) => {
//         const estaSeleccionado = selectedKeywords.includes(palabra);
//         const estiloFinal = `botonSelector ${
//           estaSeleccionado              ? "botonSelectorSeleccionado"
//             : "botonSelectorNoSeleccionado"
//         }`;

//         return (
//           <button
//             className={estiloFinal}
//             key={palabra}
//             onClick={() => handleKeywordClick(palabra)}
//           >
//             {palabra}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default PalabrasClavesSelector;
