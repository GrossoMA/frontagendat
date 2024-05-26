import React, { useState, useEffect, useContext } from "react";
import EventForm from ".components/EventForm";
import municipiosData from "../data/municipios.json";
import "../styles/FormStyles.css";
import "../styles/EstadoIcono.css";
import { LoginContext } from "../context/isLogin";

export const FormEvento = () => {
  const { handleLogin } = useContext(LoginContext);

  // Estado del formulario
  const [evento, setEvento] = useState({
    nombreEvento: "",
    municipio: "",
    localidad: "",
    direccion: "",
    fechaInicio: "",
    fechaFin: "",
    mes: "",
    horarioInicio: "",
    horarioFin: "",
    tipoEvento: "",
    descripcion: "",
    grupos: "",
    redesSociales: "",
    googleMaps: "",
  });
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };
  // Inicializar un objeto para almacenar los municipios con sus localidades
  const municipiosConLocalidades = municipiosData.reduce(
    (acc, { Municipio, Localidad }) => {
      // Si el municipio ya existe en el acumulador, solo añade la localidad al arreglo de localidades
      if (acc[Municipio]) {
        acc[Municipio].add(Localidad);
      } else {
        // Si el municipio no existe, lo inicializa con un nuevo Set que contiene la localidad
        acc[Municipio] = new Set([Localidad]);
      }
      return acc;
    },
    {}
  );
  // Para trabajar con este objeto o convertir en un arreglo de objetos hago lo siguiente:
  const municipiosYLocalidadesArray = Object.entries(
    municipiosConLocalidades
  ).map(([municipio, localidadesSet]) => ({
    municipio,
    localidades: Array.from(localidadesSet), // Convertir cada Set de localidades a un arreglo
  }));

  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [localidadesMunicipio, setLocalidades] = useState([]);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");
  const [horarioInicio, setHorarioInicio] = useState({
    hora: "0",
    minutos: "0",
  });
  const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState("");

  const handleMunicipioChange = (e) => {
    const municipio = e.target.value;
    setMunicipioSeleccionado(municipio);

    // Encuentra las localidades para el municipio seleccionado
    const municipioObj = municipiosYLocalidadesArray.find(
      (m) => m.municipio === municipio
    );
    const localidadesMunicipio = municipioObj ? municipioObj.localidades : [];

    // Actualiza el estado de localidades y resetea la localidad seleccionada
    setLocalidades(localidadesMunicipio);
    setLocalidadSeleccionada(""); // O podrías establecerlo al primer elemento de localidadesMunicipio si siempre quieres tener una localidad seleccionada
  };

  const handleLocalidadChange = (e) => {
    setLocalidadSeleccionada(e.target.value);
  };
  const handleFechaInicioChange = (e) => {
    console.log("Fecha Inicio Change");
    console.log(e.target.value);
    const { name, value } = e.target;
    const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

    // Verifica si la fecha seleccionada es anterior a la fecha actual
    if (value >= today) {
      setEvento({ ...evento, [name]: value });
    } else {
      console.log(e.target);
      // Manejar el caso de una fecha no válida, por ejemplo, mostrando una alerta
      alert(`La fecha de inicio debe ser mayor o igual a ${today}.`);
      // Opcionalmente, resetear el valor del campo de fecha de inicio si es inválido
      // setEvento({ ...evento, [name]: "" });
    }
  };
  // Manejar cambio en las horas
  const handleHoraChange = (e) => {
    setHorarioInicio({ ...horarioInicio, hora: e.target.value });
  };

  // Manejar cambio en los minutos
  const handleMinutosChange = (e) => {
    setHorarioInicio({ ...horarioInicio, minutos: e.target.value });
  };
  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(evento);
    // Aquí podrías enviar el `evento` a una base de datos o backend
  };
  const LogOut = () => {
    handleLogin();
  };

  return (
    <div></div>
    // <EventForm />
    // <Menu>
    //   <header className='flex justify-between items-center'>
    //       <h2 className='font-bold text-2xl'>Eventos</h2>
    //       <IconAdd
    //         // onClick={handleInsertEvento}
    //         className='h-10 w-10 mr-2 hover:text-blue-500 cursor-pointer hover:scale-105 transition'
    //       />
    //     </header>
    //   <div className="form-container">
    //   <form onSubmit={handleSubmit} className="form space-y-4">

    //     <div>
    //     <div className="form-field">
    //       <InputField
    //         label="Nombre del Evento"
    //         name="nombreEvento"
    //         value={evento.nombreEvento}
    //         onChange={handleChange}
    //         placeholder="Nombre del Evento"
    //       />
    //       </div>
    //       <MunicipioSelector
    //         municipiosYLocalidades={municipiosYLocalidadesArray}
    //         municipioSeleccionado={municipioSeleccionado}
    //         handleMunicipioChange={handleMunicipioChange}
    //       />
    //       <LocalidadSelector
    //         localidadesMunicipio={localidadesMunicipio}
    //         localidadSeleccionada={localidadSeleccionada}
    //         handleLocalidadChange={handleLocalidadChange}
    //       />
    //       <InputField
    //         label="Direccion"
    //         name="direccion"
    //         value={evento.direccion}
    //         onChange={handleFechaInicioChange}
    //         placeholder="Dirección (*)"
    //         className="input"
    //       />
    //       <FechaInput
    //         label="Fecha de Inicio"
    //         name="fechaInicio"
    //         value={evento.fechaInicio}
    //         handleFechaInicioChange={handleFechaInicioChange}
    //         placeholder="Fecha Inicio"
    //         minDate={"2024-03-01"}
    //         maxDate={"2025-12-31"}
    //       />
    //       <input
    //         type="text"
    //         name="fechaFin"
    //         value={evento.fechaFin}
    //         onChange={handleChange}
    //         placeholder="Fecha Fin"
    //         className="input"
    //       />
    //       <MesesSelector label="Mes estimado" name="mesAprox" />
    //       <HorarioInput
    //         label="Horario de Inicio"
    //         name="horarioInicio"
    //         hora={horarioInicio.hora}
    //         minutos={horarioInicio.minutos}
    //         onHoraChange={handleHoraChange}
    //         onMinutosChange={handleMinutosChange}
    //       />
    //       <TipoEvento label="Tipo Evento" nombre="tipoEvento" />
    //       <TextAreaField
    //         label="Descripción del Evento"
    //         name="descripcion"
    //         value={evento.descripcion}
    //         onChange={handleChange}
    //         placeholder="Describe el evento..."
    //       />
    //       <PalabrasClavesContenedor />
    //     </div>

    //     <button type="submit" className="btn">
    //       resto del codigo para Cargar Evento
    //     </button>
    //   </form>
    //   </div>
    // </Menu>
  );
};
