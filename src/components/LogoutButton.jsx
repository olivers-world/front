import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
}

  return (
    <button onClick={signOut} className={"bg-primary text-white px-4 py-2 rounded-sm"}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;
