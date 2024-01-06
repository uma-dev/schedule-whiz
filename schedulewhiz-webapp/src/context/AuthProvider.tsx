import { ReactNode, createContext, useEffect, useState } from "react";

// Create the context with initial values
interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create the provider component that wraps the app
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // TODO implement token verification
    const isAuthenticated = token !== null;

    setToken(isAuthenticated ? token : null);
    setUserEmail(userEmail);
  }, [token, userEmail]);

  const login = (newToken: string, userEmail: string) => {
    setToken(newToken);
    setUserEmail(userEmail);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: token !== null,
        token,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
