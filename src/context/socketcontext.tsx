import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { api_url } from '../context/envar';

export const SocketContext = createContext<{
    socketValue: Socket | null;
    setSocketValue: Dispatch<SetStateAction<Socket | null>>;
} | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const url = useContext(api_url);
    const [socketValue, setSocketValue] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io(url, { auth: { token: localStorage.getItem('accessToken') } });
        socket.on('connect', () => {
            setSocketValue(socket);
        });
        return () => {
            socket.disconnect();
        };
    }, [url]);

    const value = useMemo(() => ({ socketValue, setSocketValue }), [socketValue]);

    
    return (
        <SocketContext.Provider value={value}>
        {children}
        </SocketContext.Provider>
    );
};