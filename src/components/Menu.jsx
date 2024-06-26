import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Header } from "./Header";
import {
  IconDashboard,
  IconProfile,
  IconArrow,
  IconAdd,
} from "../components/Icons";

// El menu utiliza el componente Header para mantener siempre la cabecera visible, pero el aside bar para ser responsivo usa un useState y toma el children para acomodarlo dependiendo de la vision misma de la pagina

const initialNavigationBar = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <IconDashboard />,
    current: true,
  },
  {
    name: "Agregar Eventos",
    route: "/eventos",
    icon: <IconAdd />,
    current: false,
  },
];

const navigationProfile = {
  name: "Perfil",
  route: "/profile",
  icon: <IconProfile />,
  current: false,
};

export const Menu = ({ children }) => {
  const [responsiveSideMenu, setResponsiveSideMenu] = useState(true);
  const [navigationBar, setNavigationBar] = useState(initialNavigationBar);
  const [profileCurrent, setProfileCurrent] = useState(false);

  const handleNavigationBar = (item) => {
    setNavigationBar(
      navigationBar.map((i) => ({
        ...i,
        current: i.name === item.name,
      }))
    );
    setProfileCurrent(item === "profile");
  };

  return (
    <>
      {!localStorage.id && <Navigate to="/" replace />}
      <Header
        setResponsiveSideMenu={setResponsiveSideMenu}
        responsiveSideMenu={responsiveSideMenu}
      />
      <main className="flex">
        <div
          onClick={() => {
            setResponsiveSideMenu(!responsiveSideMenu);
          }}
          className={`z-40 w-full h-screen fixed top-0 left-0 bg-slate-950 bg-opacity-50 ${
            responsiveSideMenu ? " -translate-x-full " : " w-full "
          } lg:translate-x-0 lg:hidden transition-none `}
        />
        <aside
          className={`bg-gray-100 h-screen fixed top-0 left-0 pt-14 z-40 lg:translate-x-0 lg:w-52 flex flex-col justify-between ${
            responsiveSideMenu ? " -translate-x-full " : " w-52 "
          } transition-all lg:transition-all`}
        >
          <nav className="w-52 bg-gray-100 p-4">
            <ul className="flex gap-2 flex-col">
              {navigationBar.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.route}
                    onClick={() => handleNavigationBar(item)}
                    className={`p-1 flex items-center text-base text-gray-500 font-bold hover:ring-2 hover:ring-purple-500 hover:rounded-md hover:text-purple-500 focus:bg-white focus:text-purple-500 rounded-md focus:shadow-sm ${
                      item.current ? "bg-white text-purple-500 shadow-sm" : ""
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            to={navigationProfile.route}
            onClick={() => handleNavigationBar("profile")}
          >
            <div
              className={` m-2 mb-6 border border-slate-200 rounded-xl p-2 flex items-center justify-evenly gap-2 cursor-pointer hover:bg-purple-500 hover:text-white ${
                profileCurrent
                  ? " bg-purple-500 text-white shadow-sm "
                  : " bg-white"
              }`}
            >
              <IconProfile />
              <div>
                <p className="text-sm">{localStorage.username}</p>
                <span className="text-xs">mail@mail.com</span>
              </div>
              <IconArrow />
            </div>
          </Link>
        </aside>
        <section className="transition-all px-4 w-full lg:ml-52 pt-16 lg:pt-4 relative">
          {children}
        </section>
      </main>
    </>
  );
};
