import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SocketContext } from './socketcontext';

// Define the initial state for the channel context
interface ChannelContextState {
    currentChannel: string | null;
    setChannel: (channel: string | null) => void;
}

// Create the channel context
export const ChannelContext = createContext<ChannelContextState>({
    currentChannel: null,
    setChannel: () => {},
});

// Create a provider component to wrap your app with
export const ChannelProvider = ({ children }: { children: React.ReactNode }) => {
    const socketContext = useContext(SocketContext);
    const socket = useRef(socketContext?.socketValue);
    const [currentChannel, setCurrentChannel] = useState<string | null>(null);

    useEffect(() => {
        socket.current = socketContext?.socketValue;
    }, [socketContext?.socketValue]);

    const value = useMemo(() => ({ currentChannel, setChannel : (channel: string | null) => {
        socket.current?.emit("join_room", channel);
        setCurrentChannel(channel)
    } }), [currentChannel]);

    return (
        <ChannelContext.Provider value={value}>
            {children}
        </ChannelContext.Provider>
    );
};