import React from "react";
import "../components/BotonGuardarEvento.css";

function BotonGuardarEvento({ texto, onClick }) {
  const estiloFinal = "botonGuardarEvento";

  return (
    <button className={estiloFinal} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotonGuardarEvento;
