import { useContext } from "react";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface UserStorage {
  token?: string;
  email?: string;
}

interface AuthContextProps {
  user: UserStorage | null;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
