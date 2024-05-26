import React, { useState } from "react";
import PalabrasClavesSelector from "../components/PalabrasClaveSelector"; // Asegúrate de que la ruta sea correcta

function PalabrasClavesContenedor({
  selectedKeywords,
  onSelectKeyword,
  onDeselectKeyword,
  onChange,
}) {
  // console.log(selectedKeywords, " selected");
  // Arreglo de palabras claves, podría ser importado o definido aquí
  const palabrasClaves = [
    "Música",
    "Show",
    "Infantil",
    "Comida",
    "Deporte",
    "Cultura",
    "Religión",
    "Gastronomía",
    "Arte",
    "Exposición",
    "Feria",
    "Aniversario",
    "Localidad",
    "Regional",
    "Competencia",
    "Tradición",
    "Festival",
    "Celebración",
    "Concierto",
    "Taller",
    "Seminario",
    "Conferencia",
    "Educación",
    "Entretenimiento",
    "Aire libre",
    "Familia",
    "Mercado",
    "Artesanía",
    "Turismo",
    "Aventura",
    "Danza",
    "Teatro",
    "Literatura",
    "Pintura",
    "Fotografía",
    "Cine",
    "Historia",
    "Tecnología",
    "Ciencia",
  ];

  return (
    <div>
      <h2>Selecciona palabras claves</h2>
      <PalabrasClavesSelector
        palabrasClaves={palabrasClaves}
        selectedKeywords={selectedKeywords}
        onSelectKeyword={onSelectKeyword}
        onDeselectKeyword={onDeselectKeyword}
        onChange={onChange}
      />
      <ul>
        {selectedKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}

export default PalabrasClavesContenedor;
