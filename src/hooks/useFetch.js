/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../routes/apiUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useFetch = ({ endpoint, requestOptions, body = {} }) => {
  // console.log("endpoint", endpoint);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        let response;
        console.log(API_BASE_URL + endpoint, requestOptions);
        if (body) {
          response = await fetch(API_BASE_URL + endpoint, requestOptions); //, body);
        } else {
          response = await fetch(API_BASE_URL + endpoint, requestOptions);
        }
        console.log("->", response);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
        if (error.message === "UNAUTHORIZED") {
          toast.success("sesion expirada");
          localStorage.clear();
          return navigate("/");
        }
      }
    };
    fetchData();
  }, [endpoint]);
  return { data, isPending, error };
};

// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "../routes/apiUrl";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const useFetch = ({ endpoint, requestOptions, body = null }) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsPending(true);
//       try {
//         const options = { ...requestOptions };
//         if (body) {
//           options.body = JSON.stringify(body);
//         }

//         const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }

//         const json = await response.json();
//         setData(json);
//         setError(null);
//       } catch (error) {
//         setError(`${error} Could not fetch data`);
//         if (error.message === "UNAUTHORIZED") {
//           toast.success("Sesión expirada");
//           localStorage.clear();
//           navigate("/");
//         }
//       } finally {
//         setIsPending(false);
//       }
//     };

//     fetchData();
//   }, [endpoint, requestOptions, body, navigate]);

//   return { data, isPending, error };
// };

// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "../routes/apiUrl";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const useFetch = ({ endpoint, requestOptions }) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   // ----
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_BASE_URL + endpoint, requestOptions);
//         console.log(API_BASE_URL + endpoint, requestOptions, response);

//         if (!response.ok) {
//           console.log("error response useFetch");
//           throw new Error(response.statusText);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(err.message);

//         if (
//           error.message === "UNAUTHORIZED" ||
//           err.message === "Unauthorized"
//         ) {
//           toast.success("sesion expirada");
//           localStorage.clear();
//           setTimeout(() => {
//             navigate("/");
//           }, 1000);
//         }
//       } finally {
//         setIsPending(false);
//       }
//     };
//     fetchData();
//   }, [endpoint, requestOptions, navigate]);
//   return { data, isPending, error };
// };
