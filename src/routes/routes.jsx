import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";

import { Profile } from "../pages/Profile";
import { Eventos } from "../pages/Eventos";
import { EventosEdit } from "../pages/EventosEdit";
// import { EventosAdmin } from "../pages/EventosAdmin";
import { Landing } from "../pages/Landing";
import { ErrorPage } from "../pages/404";
import { SignIn } from "../pages/SignIn";
// import { ApiDoc } from "../pages/ApiDoc";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/eventos",
    element: <Eventos />,
  },
  {
    path: "/eventos/:evento_id",
    element: <EventosEdit />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
