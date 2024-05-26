// validaciones.js

export const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === "") {
    return "El nombre es obligatorio.";
  }
  return null;
};

export const validarFecha = (fecha) => {
  if (!fecha) {
    return "La fecha es obligatoria.";
  }
  // Puedes agregar más validaciones, como formato de fecha correcto
  return null;
};

export const validateHorario = (hora, minutos, isRequired) => {
  // console.log(hora, minutos, isRequired);
  if (
    hora !== undefined &&
    minutos !== undefined &&
    hora !== "-" &&
    minutos !== "-" &&
    isRequired
  ) {
    return "ok";
  } else {
    if (isRequired) {
      return "x";
    } else {
      return "-";
    }
  }
};

// const validarHorario = (hora, minutos, requerido) => {
//   if (requerido) {
//     if (hora === "-" || minutos === "-") {
//       return "El horario es obligatorio.";
//     }
//   }
//   return null;
// };
// Agrega más funciones de validación según tus necesidades
