import { createContext, useState } from 'react';


type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const authContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  const login = () => {
    isAuthenticated = true;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <authContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
};