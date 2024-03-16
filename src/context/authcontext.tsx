import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  nikname: string;
}

interface UserContextInterface {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  setToken: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  // register: (values: any, actions: any) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  accessToken: '',
  refreshToken: '',
  setToken: (accessToken: string, refreshToken: string) => { },
  logout: () => { },
  // register: (values: any, actions: any) => { },
});

export const useUserContext = () => React.useContext(UserContext);

export function useCreateLoginContext(): UserContextInterface {

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setUser(null);
    } else {
      setUser(jwtDecode<User>(accessToken || ''));
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(jwtDecode<User>(accessToken));
    }
  }, []);

  const setToken = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
    setRefreshToken('');
    setUser(null);
  };

  // const register = (values: any, actions: any) => { };

  return { user, accessToken, refreshToken, setToken, logout };
}

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useCreateLoginContext();

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;