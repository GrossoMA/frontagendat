import React from "react";
import EventoCard from "./EventoCard";

const ListadoEventos = ({ data, onEditClick }) => {
  return (
    <>
      <h2 className="text-blue-500 text-xl font-bold text-center">
        Listado Eventos Cargados
      </h2>
      <label
        htmlFor="min-stock"
        className="font-bold text-blue-500 flex justify-center items-center gap-4 mb-2"
      >
        Próximos Eventos:
      </label>
      <div className="bg-gray-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 mb-4 gap-4">
        {data?.message ? (
          <p className="text-red-500 font-bold text-center">No hay eventos</p>
        ) : (
          data?.map((d) => (
            <EventoCard
              key={d.id_evento}
              evento={d}
              onEditClick={onEditClick}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ListadoEventos;
