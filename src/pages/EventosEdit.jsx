import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export const EventosEdit = () => {
  const { evento_id } = useParams();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const userId = localStorage.id;
  const token = localStorage.token;
  const { handleLogin } = useContext(LoginContext);

  const endpoint = `user/${userId}/eventos/${evento_id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_BASE_URL + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
            "user-id": userId,
          },
        });
        if (!response.ok) throw new Error(response.statusText);
        const eventoEdit = await response.json();
        console.log("evento edit");
        console.log(eventoEdit);
        setDataForm({
          id_evento: eventoEdit.id_evento || 0,
          fechaInicio: "", //eventoEdit.fecha_inicio || "",
          mes: eventoEdit.mes || "",
          eventoHorarioHora: eventoEdit.eventoHorarioHora || "-",
          eventoHorarioMinutos: eventoEdit.eventoHorarioMinutos || "-",
          eventoHorarioRequerido: eventoEdit.eventoHorarioRequerido || false,
          nombreEvento: eventoEdit.nombreEvento || "",
          municipio: eventoEdit.municipio || "",
          localidad: eventoEdit.localidad || "",
          direccion: eventoEdit.direccion || "",
          tipoEvento: eventoEdit.tipoEvento || "",
          descripcion: eventoEdit.descripcion || "",
          palabrasClavesSeleccionadas:
            eventoEdit.palabrasClavesSeleccionadas || [],
          idEstado: eventoEdit.idEstado || "0",
          image1: eventoEdit.image1 || null,
          image2: eventoEdit.image2 || null,
          image3: eventoEdit.image3 || null,
        });

        setLoading(false);
      } catch (error) {
        setMessage(`${error} Could not Fetch Data`);
        setMessageType("error");
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, token, userId]);

  const validateForm = () => {
    let formErrors = {};
    if (!dataForm.nombreEvento)
      formErrors.nombreEvento = "El nombre del evento es obligatorio";
    if (!dataForm.municipio)
      formErrors.municipio = "El municipio es obligatorio";
    if (!dataForm.localidad)
      formErrors.localidad = "La localidad es obligatoria";
    if (!dataForm.fechaInicio && !dataForm.mes)
      formErrors.fechaOMes = "Debes proporcionar una fecha de inicio o un mes";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "municipio") {
      const municipioLocal = e.target.value;
      const municipioObj = municipiosYLocalidadesArray.find(
        (m) => m.municipio === municipioLocal
      );
      const localidadesMunicipio = municipioObj ? municipioObj.localidades : [];
      setLocalidades(localidadesMunicipio);
      setDataForm((prevState) => ({
        ...prevState,
        localidad: "",
      }));
    }
    setErrors((prevErrors) => {
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
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
  //   const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState("");

  const handleMesSelector = (name, value) => {
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTipoEventoChange = (e) => {
    const tipoEvento = e.target.value;
    setTipoEventoSeleccionado(tipoEvento);
    setDataForm((prevState) => ({
      ...prevState,
      tipoEvento: tipoEvento,
    }));
  };

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

  const handleImageUpload = (file, fieldName) => {
    setDataForm((prevState) => ({
      ...prevState,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("nombre_evento", dataForm.nombreEvento);
    payload.append("id_municipio", dataForm.municipio);
    payload.append("id_localidad", dataForm.localidad);
    payload.append("direccion", dataForm.direccion);
    payload.append("fecha_inicio", dataForm.fechaInicio);
    payload.append("mes_estimado", dataForm.mes);
    payload.append(
      "hora",
      `${dataForm.eventoHorarioHora}:${dataForm.eventoHorarioMinutos}`
    );
    payload.append("id_tipo_evento", dataForm.tipoEvento);
    payload.append("descripcion", dataForm.descripcion);
    payload.append(
      "palabras_claves",
      JSON.stringify(dataForm.palabrasClavesSeleccionadas)
    );
    payload.append("id_estado", dataForm.idEstado);
    if (dataForm.image1) payload.append("image1", dataForm.image1);
    if (dataForm.image2) payload.append("image2", dataForm.image2);
    if (dataForm.image3) payload.append("image3", dataForm.image3);

    try {
      const response = await fetch(API_BASE_URL + endpoint, {
        method: "PUT",
        headers: {
          "x-access-token": token,
          "user-id": userId,
        },
        body: payload,
      });

      if (!response.ok) throw new Error("Failed to update event");
      setMessage("Evento actualizado con éxito");
      setMessageType("success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  //   console.log(dataForm);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          Eventos {evento_id ? "Actualizando Evento" : "Agregando Evento"}
        </h2>
      </header>
      <div className="form-container">
        <form
          className="form space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <InputField
            label="Nombre del evento"
            name="nombreEvento"
            value={dataForm.nombreEvento}
            onChange={handleFormInput}
            error={errors.nombreEvento}
            required
          />
          {/* <MunicipioSelector
            municipiosYLocalidadesArray={municipiosYLocalidadesArray}
            selectedMunicipio={dataForm.municipio}
            onMunicipioChange={handleFormInput}
            name="municipio"
            error={errors.municipio}
          /> */}
          <LocalidadSelector
            localidadesMunicipio={localidadesMunicipio}
            selectedLocalidad={dataForm.localidad}
            onLocalidadChange={handleFormInput}
            name="localidad"
            error={errors.localidad}
          />
          <InputField
            label="Dirección"
            name="direccion"
            value={dataForm.direccion}
            onChange={handleFormInput}
          />
          <FechaInput
            label="Fecha de inicio"
            name="fechaInicio"
            value={dataForm.fechaInicio}
            onChange={handleFormInput}
            error={errors.fechaOMes}
          />
          <MesesSelector
            label="Mes estimado"
            name="mes"
            value={dataForm.mes}
            onChange={handleMesSelector}
            error={errors.fechaOMes}
          />
          <HorarioInput
            label="Horario"
            name="eventoHorario"
            eventoHorarioHora={dataForm.eventoHorarioHora}
            eventoHorarioMinutos={dataForm.eventoHorarioMinutos}
            onHorarioChange={handleFormInput}
          />
          {/* <TipoEventoSelector
            selectedTipoEvento={dataForm.tipoEvento}
            onTipoEventoChange={handleTipoEventoChange}
          /> */}
          <TextAreaField
            label="Descripción"
            name="descripcion"
            value={dataForm.descripcion}
            onChange={handleFormInput}
          />
          <PalabrasClavesContenedor
            palabrasClavesSeleccionadas={dataForm.palabrasClavesSeleccionadas}
            onSelectKeyword={handleSelectKeyword}
            onDeselectKeyword={handleDeselectKeyword}
          />
          <ImageUpload
            label="Imagen 1"
            name="image1"
            onImageUpload={(file) => handleImageUpload(file, "image1")}
          />
          <ImageUpload
            label="Imagen 2"
            name="image2"
            onImageUpload={(file) => handleImageUpload(file, "image2")}
          />
          <ImageUpload
            label="Imagen 3"
            name="image3"
            onImageUpload={(file) => handleImageUpload(file, "image3")}
          />
          <div className="form-buttons">
            <button
              type="submit"
              className={`button ${isSubmitting ? "button-disabled" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};
