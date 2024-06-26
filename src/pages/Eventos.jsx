import React, { useState, useEffect, useContext } from "react";
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
import ImageUpload from "../components/ImageUpload";
import { API_BASE_URL, ENDPOINTS } from "../routes/apiUrl";

export const Eventos = ({ eventoExistente }) => {
  // console.log("cargando Eventos", eventoExistente);
  const initialFormState = {
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
  };
  const [dataForm, setDataForm] = useState(initialFormState);

  useEffect(() => {
    // console.log("consultando useEffect", eventoExistente);
    if (eventoExistente) {
      setDataForm({
        fechaInicio: eventoExistente.fecha_inicio,
        mes: "",
        eventoHorarioHora: eventoExistente.hora.split(":")[0],
        eventoHorarioMinutos: eventoExistente.hora.split(":")[1],
        eventoHorarioRequerido: false,
        nombreEvento: eventoExistente.nombre_evento,
        municipio: eventoExistente.municipio,
        localidad: eventoExistente.localidad,
        direccion: eventoExistente.direccion,
        tipoEvento: eventoExistente.tipo_evento,
        descripcion: eventoExistente.descripcion,
        palabrasClavesSeleccionadas: JSON.parse(
          eventoExistente.palabras_claves
        ),
        idEstado: eventoExistente.id_estado,
        image1: eventoExistente.img1,
        image2: eventoExistente.img2,
        image3: eventoExistente.img3,
      });
    }
  }, [eventoExistente]);

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
    setDataForm(initialFormState);
  };

  const validateForm = () => {
    let formErrors = {};

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

      const requestOptions = {
        method: "POST", //eventoExistente ? "PUT" :
        headers: {
          "x-access-token": localStorage.token, // Reemplaza 'tu_token' por tu token real
          "user-id": user_id,
        },
        body: payload,
      };
      const endpoint =
        "https://grosso4le.pythonanywhere.com" +
        "/" +
        "user" +
        "/" +
        user_id +
        "/eventos";
      // const endpoint = eventoExistente? `${API_BASE_URL}/${ENDPOINTS.eventos(user_id)}/${eventoExistente.id}`
      // : `${API_BASE_URL}/${ENDPOINTS.eventos(user_id)}`;

      const response = await fetch(endpoint, requestOptions);
      console.log(endpoint);
      console.log("luego de insert", response);
      if (response.ok) {
        const result = await response.json();
        resetInfoForm();
        setMessage(
          eventoExistente
            ? "Evento actualizado con éxito!"
            : "Se ha guardado con éxito! Puede seguir cargando..."
        );
        setMessageType("success");

        // Recarga la página

        setTimeout(() => {
          window.location.reload();
          console.log(window.location.API_BASE_URL);
        }, 1300);
      } else {
        const errorData = await response.json();
        setMessage("Error al crear/actualizar el evento: " + errorData.message);
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
    console.log(errors, "errores despues de validar");

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

  const [localidadesMunicipio, setLocalidades] = useState([]);

  const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState("");

  const handleTipoEventoChange = (e) => {
    const tipoEvento = e.target.value;
    setTipoEventoSeleccionado(tipoEvento);
    dataForm.tipoEvento = tipoEvento;
  };

  const LogOut = () => {
    handleLogin();
  };

  return (
    <Menu>
      <header className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          Eventos {eventoExistente ? "Actualizando Evento" : "Agregando Evento"}
        </h2>
      </header>
      <div className="form-container">
        <form
          className="form space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="form-title">Crear / Editar Evento</h2>
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
            minDate={"2024-01-01"}
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
          <div className="form-buttons">
            <button
              className="botonEvento botonGuardar"
              type="submit"
              disabled={isSubmitting}
            >
              <IconAdd />
              {eventoExistente ? "Actualizar Evento" : "Agregar Evento"}
            </button>
          </div>
        </form>
      </div>
    </Menu>
  );
};
