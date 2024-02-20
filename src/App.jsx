import "react-calendar/dist/Calendar.css";
import Reservation from "./pages/Reservation.jsx";
import Home from "./pages/Home.jsx";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
