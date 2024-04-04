import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with auth provider");
  }
  return context;
};

export default useAuth;
