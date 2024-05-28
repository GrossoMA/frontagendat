// export default BotonSelector;
import React from "react";
import "../components/BotonSelector.css";

function BotonSelector({ label, value, texto, estaSeleccionado, onClick }) {
  const estiloFinal = `botonSelector ${
    estaSeleccionado
      ? "botonSelectorSeleccionado"
      : "botonSelectorNoSeleccionado"
  }`;

  // Renderiza el icono solo si iconoPath está definido
  // const renderIcono = () => {
  //   if (!iconoPath) return null;
  //   return (
  //     <img
  //       src={iconoPath}
  //       alt=""
  //       className={`icono ${obtenerClasePosicionIcono(posicionIcono)}`}
  //     />
  //   );
  // };
  // Función para determinar la clase de posición del icono
  const obtenerClasePosicionIcono = (posicion) => {
    switch (posicion) {
      case 1:
        return "icono-izquierda";
      case 2:
        return "icono-arriba";
      case 3:
        return "icono-derecha";
      case 4:
        return "icono-abajo";
      default:
        return "";
    }
  };

  return (
    <button
      className={estiloFinal}
      onClick={onClick}
      type="button"
      // label={label}
      // value={value}
    >
      {texto}
    </button>
  );
}

export default BotonSelector;
