/* eslint-disable react/jsx-indent */
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { Menu } from "../components/Menu";
import { useFetch } from "../hooks/useFetch";
import ListadoEventos from "../components/ListadoEventos";
import EventoCard from "../components/EventoCard";
// import Evento from "../pages/Eventos";

// ----------------------------------------------------------------
// Manejar Editar
// ----------------------------------------------------------------
// const [selectedEvent, setSelectedEvent] = useState(null);

// const handleEditClick = (event) => {
//   setSelectedEvent(event);
// };
// ----------------------------------------------------------------
const useObtainEventos = () => {
  const endpointAllEventos = `user/${localStorage.id}/eventos`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.token,
      "user-id": localStorage.id,
    },
  };

  const { data, isPending, error } = useFetch({
    endpoint: endpointAllEventos,
    requestOptions,
  });

  return { data, isPending, error };
};

export const Dashboard = () => {
  const { data: dataEventos, isPending: isPendingEventos } = useObtainEventos();

  return (
    <>
      <Menu>
        <h2 className="font-bold text-2xl mb-4">Resumen Eventos Cargados</h2>
        <div className="flex flex-col gap-10 justify-center">
          <div>
            <hr />
            {isPendingEventos ? (
              <Loader />
            ) : (
              <ControlEventos data={dataEventos} />
            )}
          </div>
        </div>
      </Menu>
    </>
  );
};

const ControlEventos = ({ data }) => {
  return (
    <>
      <ListadoEventos data={data} />
      {/* {selectedEvent && <Evento event={selectedEvent} />} */}
    </>
  );
};
