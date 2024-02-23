import { ReactNode, createContext, useEffect, useState } from "react";

// Create the context with initial values
interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  tokenForRefresh: string | null;
  userEmail: string | null;
  login: (token: string, refreshToken: string, userEmail: string) => void;
  logout: () => void;
  setRefreshToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create the provider component that wraps the app
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenForRefresh, setTokenForRefresh] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // TODO implement token verification
    const isAuthenticated = token !== null;

    setToken(isAuthenticated ? token : null);
    setTokenForRefresh(isAuthenticated ? tokenForRefresh : null);
    setUserEmail(userEmail);
  }, [token, tokenForRefresh, userEmail]);

  const login = (newToken: string, refreshToken: string, userEmail: string) => {
    setToken(newToken);
    setTokenForRefresh(refreshToken);
    setUserEmail(userEmail);
  };

  const logout = () => {
    setToken(null);
    setTokenForRefresh(null);
    setUserEmail(null);
  };

  const setRefreshToken = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: token !== null,
        token,
        tokenForRefresh,
        userEmail,
        login,
        logout,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
