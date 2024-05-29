// src/components/ControlEventos.js
import EventoCard from "./EventoCard";

const ControlEventos = ({ data, openModal }) => {
  return (
    <>
      <h2 className="text-blue-500 text-xl font-bold text-center">
        Eventos Cargados
      </h2>
      <label
        htmlFor="eventos-cargados"
        className="font-bold text-blue-500 flex justify-center items-center gap-4 mb-2"
      >
        Proximo Evento:
      </label>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        {data?.message ? (
          <p className="text-red-500 font-bold text-center p-2">
            No hay eventos
          </p>
        ) : (
          <div>
            {data?.map((d) => (
              <div key={d.id_evento} className="border-b border-gray-300">
                <EventoCard evento={d} openModal={() => openModal(d)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ControlEventos;
