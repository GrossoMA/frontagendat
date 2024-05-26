import React, { useState, useContext } from "react";
import { IconAdd } from "../components/Icons";
import municipiosData from "../data/municipios.json";
import "../styles/FormStyles.css";
import "../styles/EstadoIcono.css";
import { Menu } from "../components/Menu";
import { LoginContext } from "../context/isLogin";
import InputField from "../components/InputField";
import MunicipioSelector from "../components/MunicipioSelector";
import LocalidadSelector from "../components/LocalidadSelector";
import FechaInput from "../components/FechaInput";
import MesesSelector from "../components/MesesSelector";
import HorarioInput from "../components/HoraInput";
import TipoEventoSelector from "../components/TipoEventoSelector";
import TextAreaField from "../components/TextAreaField";
import PalabrasClavesContenedor from "../components/PalabrasClaveContenedor";
import BotonGuardarEvento from "../components/BotonGuardarEvento";

export const Eventos = () => {
  const [dataForm, setDataForm] = useState({
    fechaInicio: "",
    mes: "",
    eventoHorarioHora: "-",
    eventoHorarioMinutos: "-",
    eventoHorarioRequerido: false,
    nombreEvento: "",
    municipio: "",
    localidad: "",
    direccion: "",
    tipoEvento: "",
    descripcion: "",
    palabrasClaves: "",
    idEstado: "0",
  });

  const tiposEventosArray = [
    "Aniversario Localidad",
    "Evento Cultural",
    "Evento Deportivo",
    "Evento Gastronómico",
    "Evento Religioso",
    "Exposición",
    "Feria",
    "Feria/ Exposición",
    "Fiesta Cultural",
    "Fiesta Regional",
  ];
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleSelectKeyword = (keyword) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleDeselectKeyword = (keyword) => {
    setSelectedKeywords(
      selectedKeywords.filter((selectedKeyword) => selectedKeyword !== keyword)
    );
  };

  const handleMesSelector = (name, value) => {
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { handleLogin } = useContext(LoginContext);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    // console.log("validando dentro antes de mostrando errors", errors);

    let formErrors = {};
    // console.log("validando", errors, formErrors);
    // console.log("!dataForm.nombreEvento ", !dataForm.nombreEvento);
    if (!dataForm.nombreEvento) {
      formErrors.nombreEvento = "El nombre del evento es obligatorio";
    }

    if (!dataForm.municipio) {
      formErrors.municipio = "El municipio es obligatorio";
    }

    if (!dataForm.localidad) {
      formErrors.localidad = "La localidad es obligatoria";
    }

    if (!dataForm.fechaInicio && !dataForm.mes) {
      formErrors.fechaOMes = "Debes proporcionar una fecha de inicio o un mes";
    }

    setErrors(formErrors);
    // console.log(
    //   "validando dentro antes de mostrando errors despues de validar",
    //   errors
    // );

    return Object.keys(formErrors).length === 0;
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    console.log("actualizando ", name, value);
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Si el campo actualizado es "municipio", actualiza las localidades correspondientes
    if (name === "municipio") {
      const municipioLocal = e.target.value;

      const municipioObj = municipiosYLocalidadesArray.find(
        (m) => m.municipio === municipioLocal
      );
      const localidadesMunicipio = municipioObj ? municipioObj.localidades : [];
      setLocalidades(localidadesMunicipio);
      setDataForm((prevState) => ({
        ...prevState,
        localidad: "", // Limpiar la localidad seleccionada al cambiar de municipio
      }));
    }

    // Limpiar los errores correspondientes cuando se actualiza el valor del campo
    setErrors((prevErrors) => {
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };
  //----------------
  const buildPayload = () => {
    return {
      nombre_evento: dataForm.nombreEvento,
      id_municipio: 2, // Debes mapear el nombre del municipio al ID correspondiente
      id_localidad: 3, // Debes mapear el nombre de la localidad al ID correspondiente
      direccion: dataForm.direccion,
      fecha_inicio: dataForm.fechaInicio,
      mes_estimado: dataForm.mes,
      hora: `${dataForm.eventoHorarioHora}:${dataForm.eventoHorarioMinutos}`,
      id_tipo_evento: 1, // Debes mapear el nombre del tipo de evento al ID correspondiente
      descripcion: dataForm.descripcion,
      palabras_claves: dataForm.palabrasClaves,
      id_estado: 1, // Debes mapear el estado al ID correspondiente
    };
  };
  const submitEvento = async (payload) => {
    try {
      let user_id = localStorage.id;
      const response = await fetch(
        `https://m4legrosso.pythonanywhere.com/user/${user_id}/eventos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.token, // Reemplaza 'tu_token' por tu token real
            "user-id": user_id,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Evento creado exitosamente", data);
        // Aquí puedes manejar el éxito de la solicitud, como mostrar un mensaje o redirigir al usuario
      } else {
        const errorData = await response.json();
        console.log("Error al crear el evento", errorData);
        // Aquí puedes manejar el error de la solicitud, como mostrar un mensaje de error
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
      // Aquí puedes manejar cualquier otro error que ocurra durante la solicitud
    }
  };
  //----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errors, "errores antes de validar");
    let hayErrores = validateForm();
    console.log(errors, "errores despues de validar");

    if (hayErrores) {
      // Aquí puedes manejar el envío del formulario
      console.log("Formulario válido", dataForm);
      const payload = buildPayload();
      submitEvento(payload);
    } else {
      console.log("Formulario inválido", errors);
    }
  };

  const municipiosConLocalidades = municipiosData.reduce(
    (acc, { Municipio, Localidad }) => {
      if (acc[Municipio]) {
        acc[Municipio].add(Localidad);
      } else {
        acc[Municipio] = new Set([Localidad]);
      }
      return acc;
    },
    {}
  );

  const municipiosYLocalidadesArray = Object.entries(
    municipiosConLocalidades
  ).map(([municipio, localidadesSet]) => ({
    municipio,
    localidades: Array.from(localidadesSet),
  }));

  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [localidadesMunicipio, setLocalidades] = useState([]);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");
  const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState("");

  const handleTipoEventoChange = (e) => {
    const tipoEvento = e.target.value;
    setTipoEventoSeleccionado(tipoEvento);
    dataForm.tipoEvento = tipoEvento;
    // console.log(
    //   "estoy aca tipo evento handle",
    //   tipoEvento,
    //   dataForm.tipoEvento
    // );
  };

  // const handleMunicipioChange = (e) => {
  //   const municipioLocal = e.target.value;
  //   // setMunicipioSeleccionado(municipio);
  //   // dataForm.municipio = municipio;
  //   const municipioObj = municipiosYLocalidadesArray.find(
  //     (m) => m.municipio === municipioLocal
  //   );
  //   const localidadesMunicipio = municipioObj ? municipioObj.localidades : [];
  //   setLocalidades(localidadesMunicipio);
  //   dataForm.municipio = municipioLocal;
  //   setLocalidadSeleccionada("");
  //   setErrors((prevErrors) => {
  //     const { [name]: removedError, ...rest } = prevErrors;
  //     return rest;
  //   });
  //   // setValue("localidad", "");
  // };

  const onSubmit = (data) => {
    console.log("onSubmit:", data);
    // Aquí podrías enviar los datos a una base de datos o backend
  };

  const LogOut = () => {
    handleLogin();
  };

  return (
    <Menu>
      <header className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Eventos</h2>
        <IconAdd className="h-10 w-10 mr-2 hover:text-blue-500 cursor-pointer hover:scale-105 transition" />
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form space-y-4">
          <div>
            <InputField
              label="Nombre del Evento"
              name="nombreEvento"
              value={dataForm.nombreEvento}
              placeholder="Nombre del Evento"
              onChange={handleFormInput}
            />
            {errors.nombreEvento && (
              <span className="error-message">{errors.nombreEvento}</span>
            )}
            <MunicipioSelector
              municipiosYLocalidades={municipiosYLocalidadesArray}
              municipioSeleccionado={dataForm.municipioSeleccionado}
              name="municipio"
              value={dataForm.municipio}
              onChange={handleFormInput}
            />
            {errors.municipio && (
              <span className="error-message">{errors.municipio}</span>
            )}
            <LocalidadSelector
              localidadesMunicipio={localidadesMunicipio}
              localidadSeleccionada={dataForm.localidadSeleccionada}
              name="localidad"
              value={dataForm.localidad}
              onChange={handleFormInput}
            />
            {errors.localidad && (
              <span className="error-message">{errors.localidad}</span>
            )}
            <InputField
              label="Direccion"
              name="direccion"
              placeholder="Dirección (*)"
              value={dataForm.direccion}
              onChange={handleFormInput}
            />
            <FechaInput
              label="Fecha de Inicio"
              name="fechaInicio"
              value={dataForm.fechaInicio}
              placeholder="Fecha Inicio"
              minDate={"2024-03-01"}
              maxDate={"2025-12-31"}
              onChange={handleFormInput}
            />
            {errors.fechaOMes && (
              <span className="error-message">{errors.fechaOMes}</span>
            )}
            <FechaInput
              label="Fecha de Fin"
              name="fechaFin"
              value={dataForm.fechaFin}
              placeholder="Fecha Fin"
              minDate={"2024-03-01"}
              maxDate={"2025-12-31"}
              onChange={handleFormInput}
            />
            {/* <InputField
              label="Fecha Fin"
              name="fechaFin"
              value={dataForm.fechaFin}
              placeholder="Fecha Fin"
              onChange={handleFormInput}
            /> */}
            <MesesSelector
              label="Mes estimado"
              name="mes"
              fechaInicio={dataForm.fechaInicio}
              mesSeleccionado={dataForm.mes}
              value={dataForm.mesEstimado}
              onChange={handleMesSelector}
            />
            <HorarioInput
              label="Horario:"
              name="eventoHorario"
              hora={dataForm.eventoHorarioHora}
              minutos={dataForm.eventoHorarioMinutos}
              esrequerido={dataForm.eventoHorarioRequerido}
              onChange={handleFormInput}
            />
            {/* {errores.horario && (<span className="error">{errores.horario}</span>)} */}
            <TipoEventoSelector
              tiposEventosArray={tiposEventosArray}
              tipoEventoSeleccionado={tipoEventoSeleccionado}
              name="tipoEventoSeleccionado"
              value={dataForm.tipoEventoSeleccionado}
              handleTipoEventoChange={handleTipoEventoChange}
              onChange={handleFormInput}
              label="Tipo Evento"
            />
            <TextAreaField
              label="Descripción del Evento"
              name="descripcion"
              placeholder="Describe el evento..."
              value={dataForm.descripcion}
              onChange={handleFormInput}
            />
            <PalabrasClavesContenedor
              selectedKeywords={selectedKeywords}
              onSelectKeyword={handleSelectKeyword}
              onDeselectKeyword={handleDeselectKeyword}
              value={dataForm.selectedKeywords}
              onChange={handleFormInput}
            />
          </div>
          {/* <BotonGuardarEvento texto="Guardar Evento" onClick={handleSubmit} /> */}
          <button className="botonGuardarEvento" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </Menu>
  );
};
