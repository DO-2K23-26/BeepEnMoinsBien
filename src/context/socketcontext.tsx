import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { api_url } from '../context/envar';

export const SocketContext = createContext<{
    socketValue: Socket;
    setSocketValue: Dispatch<SetStateAction<Socket>>;
} | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const url = useContext(api_url);
    const [socketValue, setSocketValue] = useState(io(url, { auth: { token: localStorage.getItem('accessToken') } }));
    const value = useMemo(() => ({ socketValue, setSocketValue }), [socketValue]);
    
    return (
        <SocketContext.Provider value={value}>
        {children}
        </SocketContext.Provider>
    );
};