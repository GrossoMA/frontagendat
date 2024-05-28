/* eslint-disable react/jsx-indent */
import { useState } from "react";
import { Loader } from "../components/Loader";
import { Menu } from "../components/Menu";
import { useFetch } from "../hooks/useFetch";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import EventoCard from "../components/EventoCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// const useObtainBills = () => {
//   const endpointAllBills = `user/${localStorage.id}/facturas`

//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': localStorage.token,
//       'user-id': localStorage.id
//     }
//   }

//   const { data, isPending, error } = useFetch({ endpoint: endpointAllBills, requestOptions })

//   return { data, isPending, error }
// }

// const useObtainOffer = () => {
//   const endpointAllOffer = `user/${localStorage.id}/oferta`

//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': localStorage.token,
//       'user-id': localStorage.id
//     }
//   }

//   const { data, isPending, error } = useFetch({ endpoint: endpointAllOffer, requestOptions })

//   return { data, isPending, error }
// }

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
  // const { data: dataBill, isPending: isPendingBill } = useObtainBills()
  // const { data: dataOffer, isPending: isPendingOffer } = useObtainOffer()
  const { data: dataEventos, isPending: isPendingEventos } = useObtainEventos();
  //endpointAl

  return (
    <>
      <Menu>
        <h2 className="font-bold text-2xl mb-4">Dashboard</h2>
        <div className="flex flex-col gap-10 justify-center">
          {/* <div className='max-h-96'>
            {isPendingBill ? <Loader /> : <ChartDailyIncome data={dataBill} />}
          </div>
          <div className='max-h-96'>
            {isPendingBill ? <Loader /> : <ChartTypeIncome dataBill={dataBill} />}
          </div>
          <div>
            <hr />
            {isPendingBill ? <Loader /> : <ChartTopProductsServices data={dataBill} />}
          </div>
          <div>
            <hr />
            {isPendingOffer ? <Loader /> : <ControlStock data={dataOffer} />}
          </div> */}
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
      <h2 className="text-blue-500 text-xl font-bold text-center">
        Eventos Cargados
      </h2>
      <label
        htmlFor="min-stock"
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
                <EventoCard evento={d} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
