import React from 'react';

// Componente EstadoIcono
const EstadoIcono = ({ estado }) => {
  // Determina qué clase aplicar según el estado
  let claseIcono;
  let contenidoIcono;

  switch(estado) {
    case '-':
      claseIcono = 'icono-pendiente';
      contenidoIcono = '-'; // O podrías usar un icono SVG o de alguna librería de íconos aquí
      break;
    case 'x':
      claseIcono = 'icono-error';
      contenidoIcono = 'X'; // Asegúrate de tener un ícono o texto representativo
      break;
    case 'ok':
      claseIcono = 'icono-exito';
      contenidoIcono = '✓'; // O el ícono que elijas para representar éxito
      break;
    default:
      claseIcono = 'icono-desconocido';
      contenidoIcono = '?'; // En caso de un estado no definido
  }

  return <span className={`class-estado ${claseIcono}`}>{contenidoIcono}</span>;
};

export default EstadoIcono;