import React from "react";

import {
  IconAdd,
  IconProfile,
  IconEventos,
  IconArrow,
} from "../components/Icons";
const EventoCard = ({ evento, onEditClick }) => {
  // console.log(evento);

  const {
    img1,
    img2,
    img3,
    nombre_evento = "Nombre no disponible",
    fecha_inicio = "Fecha no disponible",
    nombre_municipio = "Municipio no disponible",
    nombre_localidad = "Localidad no disponible",
    descripcion = "Descripción no disponible",
    tipo_evento = "Tipo de evento no disponible",
    palabras_claves = [],
    direccion = "Dirección no disponible",
  } = evento;
  const imageUrl1 = img1
    ? `/public/imgeventos/${img1}`
    : "/public/todalainfo.png";
  const imageUrl2 = img2
    ? `/public/imgeventos/${img2}`
    : "/public/todalainfo.png";
  const imageUrl3 = img3
    ? `/public/imgeventos/${img3}`
    : "/public/todalainfo.png";

  const fechaInicioString = evento.fecha_inicio;
  let fechaFormateada = "Fecha no disponible";
  if (evento.fecha_inicio == null) {
  } else {
    try {
      const fechaInicio = new Date(fechaInicioString);
      const fechaBase = new Date("2024-01-01");
      const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
      if (fechaInicio > fechaBase) {
        // fechaInicio es posterior a fechaBase
        fechaFormateada = fechaInicio.toLocaleDateString(
          "es-ES",
          opcionesFecha
        );
      } else {
        // fechaInicio es igual o anterior a fechaBase
        fechaFormateada = "Posible error en carga de fecha.";
      }
    } catch (error) {
      console.error("Error al formatear la fecha de inicio:", error);
    }
  }

  let pClaves = [];
  try {
    pClaves = JSON.parse(evento.palabras_claves);
  } catch (error) {
    pClaves = [];
    console.error("Error al parsear palabras_claves:", error);
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={imageUrl1}
          alt={evento.nombre_evento}
          className="w-48 h-24 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{evento.nombre_evento}</h3>
          <p className="text-gray-500 bg-green-200 p-1">{fechaFormateada}</p>
        </div>
      </div>
      <p>
        <strong>Ubicación:</strong>
      </p>
      <p>Municipio: {evento.nombre_municipio}</p>
      <p>Localidad: {evento.nombre_localidad}</p>
      <p>
        <strong>Descripción del evento:</strong>
      </p>
      <p>{evento.descripcion}</p>
      <p>
        <strong>Tipo de evento:</strong> {evento.tipo_evento}
      </p>
      <p>
        <strong>Etiquetas del evento:</strong> {pClaves.join(", ")}
      </p>
      <button
        className="botonEvento botonEditar"
        type="submit"
        onClick={() => onEditClick(evento)}
      >
        <label>editar</label>
        <IconArrow />
        {/* {eventoExistente ? "Actualizar Evento" : "Agregar Evento"} */}
      </button>
    </div>
  );
};

export default EventoCard;
