import { createContext, useState } from 'react';
type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  };
  
export const api_url = createContext('');
export const authContext = createContext<AuthContextType>({isAuthenticated: false,
    login: () => {},
    logout: () => {},});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    let url = '';
    if (process.env.NODE_ENV === 'development') {
        url = 'http://localhost:9644';
    } else {
        url = 'https://api.beep.gay';
    }
    return (
        <api_url.Provider value={url}>{children}</api_url.Provider>
    );
}

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