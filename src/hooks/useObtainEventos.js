import { useFetch } from "../hooks/useFetch";

const useObtainEventos = (eventID) => {
  const userId = localStorage.id;
  const token = localStorage.token;
  const evento_id = eventID;

  const endpointAllEventos = `user/${userId}/eventos`;
  const endpointEventosEdit = `user/${userId}/eventos/${evento_id}`;
  let endpoint = endpointAllEventos;

  const requestOptionsAllEventos = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
      "user-id": userId,
    },
  };
  const requestOptionsConID = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
      "user-id": userId,
      "eventos-id": evento_id,
    },
  };
  let requestOptions = requestOptionsAllEventos;
  if (evento_id) {
    endpoint = endpointEventosEdit;
    requestOptions = requestOptionsConID;
  }

  const { data, isPending, error } = useFetch({
    endpoint: endpoint,
    requestOptions,
  });
  // console.log(data);
  return { data, isPending, error };
};

export default useObtainEventos;
