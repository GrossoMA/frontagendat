import { IconMenu } from './Icons'
import logo from '../../public/logoagenda.svg'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const Header = ({ setResponsiveSideMenu, responsiveSideMenu }) => {
  // Se realiza una relocalizacion utlizando el metodo location para poder refrescar los componentes
  // const ReturnHome = () => {
  //   window.location.href = window.location.origin
  // }
  const navigate = useNavigate(); // Hook de navegación

  // Redirección sin recargar la página
  const ReturnHome = () => {
    navigate('/');
  };
  return (
    <header className='z-50 bg-blue-100 fixed top-0 w-full h-14 flex items-center justify-between text-xl lg:w-52 transition-all lg:justify-start hover:cursor-pointer'>
      <div onClick={() => ReturnHome()} className='flex gap-2 items-center'>
        <img src={logo} alt='Logo de la empresa' className='w-20 ml-4' /> 
        <h1 className='font-bold text-lg'>Agenda Turistica</h1>
      </div>
      <button
        onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
        className='p-1 lg:hidden focus:bg-white rounded mr-1'
        aria-label='Toggle menu'
      >
        <IconMenu />
      </button>
    </header>
  )
}
