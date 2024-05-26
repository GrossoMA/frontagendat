import React, { useState } from "react";
import { useForm } from "react-hook-form";
import municipiosData from "../data/municipios.json";
import tipoEventos from "../data/tipo_eventos.json";
import InputField from "../components/InputField";
import MunicipioSelector from "../components/MunicipioSelector";
import LocalidadSelector from "../components/LocalidadSelector";
import FechaInput from "../components/FechaInput";
import HorarioInput from "../components/HoraInput";
import TipoEventoSelector from "../components/TipoEventoSelector";
import TextAreaField from "../components/TextAreaField";
import PalabrasClavesContenedor from "../components/PalabrasClaveContenedor";
import BotonGuardarEvento from "../components/BotonGuardarEvento"; // Asegúrate de importar tu nuevo componente

const EventFormV2 = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [localidadesMunicipio, setLocalidades] = useState([]);
  const [horarioInicio, setHorarioInicio] = useState({
    hora: "0",
    minutos: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({ ...prevEvento, [name]: value }));
    setValue(name, value); // Sync with react-hook-form
  };

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
  const handleTipoEventoChange = (e) => {
    const tipoEvento = e.target.value;
    setEvento((prevEvento) => ({ ...prevEvento, tipoEvento }));
    setValue("tipoEvento", tipoEvento); // Sync with react-hook-form
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

  const handleHoraChange = (e) => {
    const { name, value } = e.target;
    setHorarioInicio((prevHorario) => ({ ...prevHorario, [name]: value }));
    setEvento((prevEvento) => ({ ...prevEvento, [name]: value }));
    setValue(name, value); // Sync with react-hook-form
  };

  // Inicializar un objeto para almacenar los municipios con sus localidades
  const municipiosConLocalidades = municipiosData.reduce(
    // el método  reduce  procesar un arreglo de objetos municipiosData
    //  que contiene información sobre municipios y localidades
    // cada iteracion se acumula en acc el municipio si no existe.
    // y cada localidad se agrega al municipio
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

  // Encuentra las localidades para el municipio seleccionado
  const municipioObj = municipiosYLocalidadesArray.find(
    (m) => m.municipio === municipio
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form space-y-4">
      <InputField
        label="Nombre del Evento"
        name="nombreEvento"
        value={evento.nombreEvento}
        onChange={handleChange}
        register={register}
        placeholder="Nombre del Evento"
      />
      <MunicipioSelector
        municipiosYLocalidades={municipiosYLocalidadesArray}
        municipioSeleccionado={municipioSeleccionado}
        handleMunicipioChange={handleMunicipioChange}
        register={register}
      />
      <LocalidadSelector
        localidadesMunicipio={localidadesMunicipio}
        localidadSeleccionada={evento.localidad}
        handleLocalidadChange={handleChange}
        register={register}
      />
      <InputField
        label="Dirección"
        name="direccion"
        value={evento.direccion}
        onChange={handleChange}
        register={register}
        placeholder="Dirección"
      />
      <FechaInput
        label="Fecha de Inicio"
        name="fechaInicio"
        value={evento.fechaInicio}
        handleFechaInicioChange={handleFechaInicioChange}
        placeholder="Fecha Inicio"
        minDate={"2024-03-01"}
        maxDate={"2025-12-31"}
      />
      <HorarioInput
        label="Horario de Inicio"
        name="horaInicio"
        hora={horarioInicio.hora}
        minutos={horarioInicio.minutos}
        onHoraChange={handleHoraChange}
        onMinutosChange={handleHoraChange}
        register={register}
      />
      <TipoEventoSelector
        tiposDeEventos={tipoEventos}
        tipoEventoSeleccionado={evento.tipoEvento}
        handleTipoEventoChange={handleTipoEventoChange}
        register={register}
      />
      <TextAreaField
        label="Descripción del Evento"
        name="descripcion"
        value={evento.descripcion}
        onChange={handleChange}
        register={register}
        placeholder="Describe el evento..."
      />
      <PalabrasClavesContenedor register={register} />
      <BotonGuardarEvento
        texto="Guardar Evento"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default EventFormV2;
