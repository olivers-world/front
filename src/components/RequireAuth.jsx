import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Convertir les rôles autorisés et les rôles de l'utilisateur en tableaux pour une comparaison cohérente
  const userRoles = Array.isArray(auth?.roles) ? auth.roles : [auth?.roles];
  const isAllowed = userRoles.some((role) => allowedRoles.includes(role));
  
  return isAllowed ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
