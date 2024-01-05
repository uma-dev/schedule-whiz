import { Navigate, Outlet, RouterProps, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/authentication" replace={true} state={{ from: location }} />
  );
};

export default RequireAuth;
