import { Link } from "react-router-dom";
import React, { useState } from "react";
import { IconArrow } from "../components/Icons";
import { API_BASE_URL, ENDPOINTS } from "../routes/apiUrl";
const EventoCard = ({ evento, openModal }) => {
  // console.log("evento card", evento);
  const {
    evento_id = "0",
    img1,
    img2,
    img3,
    nombre_evento = "Nombre no disponible",
    fecha_inicio = "Fecha no disponible",
    nombre_municipio = "Municipio no disponible",
    nombre_localidad = "Localidad no disponible",
    descripcion = "Descripción no disponible",
    tipo_evento = "Tipo de evento no disponible",
    palabras_claves = "[]",
  } = evento;

  const handleEditClick = () => {
    openModal(evento);
  };

  let fechaFormateada = "Fecha no disponible";
  if (fecha_inicio) {
    try {
      const fechaInicio = new Date(fecha_inicio);
      const fechaBase = new Date("2024-01-01");
      const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
      if (fechaInicio > fechaBase) {
        fechaFormateada = fechaInicio.toLocaleDateString(
          "es-ES",
          opcionesFecha
        );
      } else {
        fechaFormateada = "Posible error en carga de fecha.";
      }
    } catch (error) {
      console.error("Error al formatear la fecha de inicio:", error);
    }
  }

  let pClaves = [];
  try {
    pClaves = JSON.parse(palabras_claves);
  } catch (error) {
    console.error("Error al parsear palabras_claves:", error);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 pb-16 mb-4 mt-10">
      <div className="flex items-center mb-4">
        <img
          src={
            img1
              ? `${API_BASE_URL}/imgeventos/${img1}`
              : "/public/todalainfo.png"
          }
          alt={nombre_evento}
          className="w-48 h-24 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{nombre_evento}</h3>
          <p className="text-gray-500 bg-green-200 p-1">{fechaFormateada}</p>
        </div>
      </div>
      <p>
        <strong>Ubicación:</strong>
      </p>
      <p>Municipio: {nombre_municipio}</p>
      <p>Localidad: {nombre_localidad}</p>
      <p>
        <strong>Descripción del evento:</strong>
      </p>
      <p>{descripcion}</p>
      <p>
        <strong>Tipo de evento:</strong> {tipo_evento}
      </p>
      <p>
        <strong>Etiquetas del evento:</strong> {pClaves.join(", ")}
      </p>
      <button
        className="botonEvento botonEditar"
        type="button"
        // onClick={handleEditClick}
      >
        <Link to={`/eventos/${evento.id_evento}`}>Editar</Link>
        {/* <label>editar</label> */}
        <IconArrow />
      </button>
    </div>
  );
};

export default EventoCard;
