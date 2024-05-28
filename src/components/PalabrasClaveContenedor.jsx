import React from "react";
import PalabrasClavesSelector from "../components/PalabrasClaveSelector"; // Asegúrate de que la ruta sea correcta

function PalabrasClavesContenedor({
  palabrasClavesSeleccionadas,
  onSelectKeyword,
  onDeselectKeyword,
  onChange,
}) {
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
        selectedKeywords={palabrasClavesSeleccionadas}
        onSelectKeyword={onSelectKeyword}
        onDeselectKeyword={onDeselectKeyword}
        onChange={onChange}
      />
    </div>
  );
}

export default PalabrasClavesContenedor;
