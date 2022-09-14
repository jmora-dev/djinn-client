import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
}

interface User {
  name: string;
}

export const AuthContext = createContext<AuthContextProps>(undefined!);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<undefined | User>(undefined);

  const login = useCallback((userAuth: User) => {
    setIsAuthenticated(true);
    setUser(userAuth);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(undefined);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
