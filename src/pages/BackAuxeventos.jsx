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
// import BotonGuardarEvento from "../components/BotonGuardarEvento";
import ImageUpload from "../components/ImageUpload";
import { API_BASE_URL, ENDPOINTS } from "../routes/apiUrl";

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
    palabrasClavesSeleccionadas: [],
    idEstado: "0",
    image1: null,
    image2: null,
    image3: null,
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
  // const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleSelectKeyword = (keyword) => {
    setDataForm((prevState) => ({
      ...prevState,
      palabrasClavesSeleccionadas: [
        ...prevState.palabrasClavesSeleccionadas,
        keyword,
      ],
    }));
  };

  const handleDeselectKeyword = (keyword) => {
    setDataForm((prevState) => ({
      ...prevState,
      palabrasClavesSeleccionadas: prevState.palabrasClavesSeleccionadas.filter(
        (k) => k !== keyword
      ),
    }));
  };

  const handleMesSelector = (name, value) => {
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { handleLogin } = useContext(LoginContext);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetInfoForm = () => {
    setDataForm({
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
      palabrasClavesSeleccionadas: [],
      idEstado: "0",
      image1: null,
      image2: null,
      image3: null,
    });
  };

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
    // console.log(e);
    const { name, value } = e.target;
    // console.log("actualizando ", name, value);
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

  const handleImageUpload = (file, fieldName) => {
    setDataForm((prevState) => ({
      ...prevState,
      [fieldName]: file,
    }));
  };
  //----------------
  const buildPayload = () => {
    const payload_aux = new FormData();
    payload_aux.append("nombre_evento", dataForm.nombreEvento);
    payload_aux.append("id_municipio", 4); // Mapea los valores correspondientes
    payload_aux.append("id_localidad", 1);
    payload_aux.append("direccion", dataForm.direccion);
    payload_aux.append("fecha_inicio", dataForm.fechaInicio);
    payload_aux.append("mes_estimado", dataForm.mes);
    payload_aux.append(
      "hora",
      `${dataForm.eventoHorarioHora}:${dataForm.eventoHorarioMinutos}`
    );
    payload_aux.append("id_tipo_evento", 1);
    payload_aux.append("descripcion", dataForm.descripcion);
    payload_aux.append(
      "palabras_claves",
      JSON.stringify(dataForm.palabrasClavesSeleccionadas)
    );
    payload_aux.append("id_estado", 1);

    if (dataForm.image1) {
      payload_aux.append("img1", dataForm.image1);
    }
    if (dataForm.image2) {
      payload_aux.append("img2", dataForm.image2);
    }
    if (dataForm.image3) {
      payload_aux.append("img3", dataForm.image3);
    }
    return payload_aux;
  };
  const submitEvento = async (payload) => {
    try {
      let user_id = localStorage.id;
      // API_BASE_URL + ENDPOINTS.signIn
      // `https://m4legrosso.pythonanywhere.com/user/${user_id}/eventos`,
      const requestOptions = {
        method: "POST",
        headers: {
          "x-access-token": localStorage.token, // Reemplaza 'tu_token' por tu token real
          "user-id": user_id,
        },
        body: payload,
      };
      const response = await fetch(
        `${API_BASE_URL}/${ENDPOINTS.eventos(user_id)}`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        // Mostrar mensaje de éxito
        resetInfoForm();
        setMessage("Se ha guardado con éxito! Puede seguir cargando...");
        setMessageType("success");

        // Recarga la página

        setTimeout(() => {
          window.location.reload();
        }, 1300);
      } else {
        const errorData = await response.json();
        setMessage("Error al crear el evento: " + errorData.message);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
      // Aquí puedes manejar cualquier otro error que ocurra durante la solicitud
      setMessage(
        "Ocurrió un error al guardar. Por favor, inténtelo nuevamente."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  //----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errors, "errores antes de validar");
    let formValido = validateForm();
    // console.log(errors, "errores despues de validar");

    if (formValido) {
      // Aquí puedes manejar el envío del formulario
      setIsSubmitting(true); //cambio el estado del boton, evitar doble click
      console.log("Formulario válido", dataForm);
      const payload = buildPayload();
      submitEvento(payload);
    } else {
      setMessage("Faltan completar campos...");
      setMessageType("incompleto");
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
            <MesesSelector
              label="Mes estimado"
              name="mes"
              fechaInicio={dataForm.fechaInicio}
              mesSeleccionado={dataForm.mes}
              // value={dataForm.mes}
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
              palabrasClavesSeleccionadas={dataForm.palabrasClavesSeleccionadas}
              onSelectKeyword={handleSelectKeyword}
              onDeselectKeyword={handleDeselectKeyword}
              onChange={handleFormInput}
            />
            {/* <ImageUpload onImageUpload={handleImageUpload} /> */}
            <ImageUpload
              onImageUpload={handleImageUpload}
              fieldName="image1"
              texto={"Ingresar imagen principal - Imagen 1"}
            />
            <ImageUpload
              onImageUpload={handleImageUpload}
              fieldName="image2"
              texto={"Ingresar imagen - Imagen 2"}
            />
            <ImageUpload
              onImageUpload={handleImageUpload}
              fieldName="image3"
              texto={"Ingresar imagen - Imagen 3"}
            />
            {message && <div className={`alert ${messageType}`}>{message}</div>}
          </div>
          <button
            className="botonGuardarEvento"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </Menu>
  );
};
