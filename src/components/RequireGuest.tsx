import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireGuest = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default RequireGuest;
