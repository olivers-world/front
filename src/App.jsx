import { Routes, Route } from "react-router-dom";
import Reservation from "./pages/Reservation.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import GiveFeedback from "./pages/Givefeedback.jsx";
import Layout from "./components/layout/Layout.jsx";
import RequireAuth from "./components/back/RequireAuth.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/givefeedback" element={<GiveFeedback />} />
      {/* <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["Administrateur"]}>
              <Admin />
            </RequireAuth>
          }
        /> */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
