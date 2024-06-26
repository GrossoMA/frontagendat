import { useForm } from "react-hook-form";
import { API_BASE_URL, ENDPOINTS } from "../routes/apiUrl";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { Link, Navigate } from "react-router-dom";
import { IconClose } from "../components/Icons";
import toast from "react-hot-toast";

export const Login = () => {
  // LLamamos el hook y obtenemos las funcionalidades que necesitamos
  const { register, handleSubmit } = useForm();
  const { user, handleUser } = useContext(UserContext);

  const onSubmit = handleSubmit(async (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.username + ":" + data.password),
      },
    };
    try {
      const response = await fetch(
        API_BASE_URL + "/" + ENDPOINTS.login,
        requestOptions
      );
      if (!response.ok) {
        // Si la respuesta no es exitosa, intentamos obtener el mensaje de error del cuerpo de la respuesta
        const errorData = await response.json();
        // Si hay un mensaje de error en la respuesta, lo utilizamos
        if (errorData && errorData.message) {
          throw new Error(errorData.message);
        } else {
          throw new Error("Error al iniciar sesion");
        }
      }
      const responseData = await response.json();
      localStorage.clear();
      localStorage.setItem("id", responseData.id);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("username", responseData.username);
      handleUser();
      toast.success("Inicio de sesion exitoso");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  });

  return (
    <>
      {user && <Navigate to="/dashboard" replace />}

      <div className="bg-[#3B82F6]/90 backdrop-blur-[1px] h-screen w-screen flex flex-col justify-center items-center">
        <Link to="/">
          <IconClose className="absolute top-0 right-0 text-white pt-2 pr-2 text-3xl hover:brightness-150" />
        </Link>
        <div className="flex flex-col justify-center items-center p-[3vw] bg-[#3B82F6] border rounded-xl border-opacity-[25] outline-white">
          <img
            src="/logoagenda.svg"
            alt="logo Agenda Turistica"
            className="max-h-14 mb-[2vh]"
          />
          <h1 className="font-bold text-2xl mb-5 text-white">Iniciar Sesion</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 ">
            <label
              htmlFor="username"
              className="flex gap-y-2 flex-col text-white text-center font-medium"
            >
              {" "}
              Ingrese su nombre de usuario:
              <input
                {...register("username")}
                id="username"
                type="text"
                required
                placeholder="usuario"
                className="p-2 w-60 rounded-md focus:outline-blue-500 focus:bg-white bg-gray-300 text-slate-600 placeholder:text-slate-400"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-col gap-y-2 text-white text-center font-medium"
            >
              {" "}
              Ingrese su contraseña:
              <input
                {...register("password")}
                id="password"
                type="password"
                required
                placeholder="contraseña"
                className="p-2 w-60 rounded-md focus:outline-blue-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-300 rounded-md p-2 font-bold hover:bg-blue-700 hover:text-white"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
