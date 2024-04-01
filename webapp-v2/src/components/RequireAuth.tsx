import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default RequireAuth;
