import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const logout = () => {
    // Supprimer le token et les rôles du localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    // Réinitialiser l'état d'authentification
    setAuth({});
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <button onClick={logout} className={"bg-primary text-white px-4 py-2 rounded-sm"}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;
