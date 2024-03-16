import { createContext } from 'react';
  
export const api_url = createContext('');

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
