import Reservation from "./pages/Reservation.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
