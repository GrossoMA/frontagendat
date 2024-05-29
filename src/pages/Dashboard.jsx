/* eslint-disable react/jsx-indent */
import Modal from "react-modal";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { Menu } from "../components/Menu";
import useObtainEventos from "../hooks/useObtainEventos";
import ControlEventos from "../components/ControlEventos";
import { useFetch } from "../hooks/useFetch";
import EventoCard from "../components/EventoCard";
import { Eventos } from "./Eventos";

// const useObtainEventos = () => {
//   const endpointAllEventos = `user/${localStorage.id}/eventos`;

//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": localStorage.token,
//       "user-id": localStorage.id,
//     },
//   };

//   const { data, isPending, error } = useFetch({
//     endpoint: endpointAllEventos,
//     requestOptions,
//   });

//   return { data, isPending, error };
// };

export const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (evento) => {
    // console.log(evento);
    setSelectedEvent(evento);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const { data: dataEventos, isPending: isPendingEventos } = useObtainEventos();

  return (
    <>
      <Menu>
        <h2 className="font-bold text-2xl mb-4">Dashboard</h2>
        <div className="flex flex-col gap-10 justify-center">
          <div>
            <hr />
            {isPendingEventos ? (
              <Loader />
            ) : (
              <>
                <ControlEventos data={dataEventos} openModal={openModal} />
              </>
            )}
          </div>
        </div>
      </Menu>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Evento Modal"
      >
        <EventoCard evento={selectedEvent} />
      </Modal>
    </>
  );
};
