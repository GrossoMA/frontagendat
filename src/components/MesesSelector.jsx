import React, { useEffect } from "react";
import BotonSelector from "./BotonSelector";
import "./MesesSelector.css";

function MesesSelector({
  label,
  name,
  fechaInicio,
  mesSeleccionado,
  onChange,
}) {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Establecer el mes seleccionado basado en fechaInicio
  useEffect(() => {
    if (fechaInicio) {
      const fecha = new Date(fechaInicio);
      if (!isNaN(fecha)) {
        const mes = fecha.getMonth(); // getMonth() devuelve un valor de 0 (enero) a 11 (diciembre)
        onChange(name, meses[mes]);
      }
    } else {
      onChange(name, null);
    }
  }, [fechaInicio]);

  // Función para manejar el clic en un mes
  const handleMesClick = (mes) => {
    if (!fechaInicio) {
      onChange(name, mes); // Asegúrate de pasar `name` y `mes`
    }
  };

  return (
    <div className="form-group mesesSelector">
      <div>
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      </div>
      <div>
        {meses.map((mes) => (
          <BotonSelector
            key={mes}
            texto={mes}
            estaSeleccionado={mesSeleccionado === mes}
            onClick={() => handleMesClick(mes)}
          />
        ))}
      </div>
    </div>
  );
}

export default MesesSelector;

// import React, { useState, useEffect } from "react";
// import BotonSelector from "./BotonSelector";
// import "./MesesSelector.css";

// function MesesSelector({ label, name, fechaInicio, onChange }) {
//   const meses = [
//     "Enero",
//     "Febrero",
//     "Marzo",
//     "Abril",
//     "Mayo",
//     "Junio",
//     "Julio",
//     "Agosto",
//     "Septiembre",
//     "Octubre",
//     "Noviembre",
//     "Diciembre",
//   ];
//   // Estado para manejar el mes seleccionado
//   const [mesSeleccionado, setMesSeleccionado] = useState(null);

//   // Establecer el mes seleccionado basado en fechaInicio
//   useEffect(() => {
//     if (fechaInicio) {
//       const fecha = new Date(fechaInicio);
//       if (!isNaN(fecha)) {
//         const mes = fecha.getMonth(); // getMonth() devuelve un valor de 0 (enero) a 11 (diciembre)
//         setMesSeleccionado(meses[mes]);
//       }
//     } else {
//       setMesSeleccionado(null);
//     }
//   }, [fechaInicio, meses]);

//   // Función para manejar el clic en un mes
//   const handleMesClick = (mes) => {
//     if (!fechaInicio) {
//       setMesSeleccionado(mes);
//       if (onChange) {
//         onChange(mes);
//       }
//     }
//   };

//   return (
//     <div className="form-group mesesSelector">
//       <div>
//         <label htmlFor={name} className="form-label">
//           {label}
//         </label>
//       </div>
//       <div>
//         {meses.map((mes) => (
//           <BotonSelector
//             key={mes}
//             texto={mes}
//             estaSeleccionado={mesSeleccionado === mes}
//             onClick={() => handleMesClick(mes)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MesesSelector;
