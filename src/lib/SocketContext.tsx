"use client";

import { RootState } from '@/redux/store';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: [],
});

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within SocketContextProvider');
    }
    return context;
};

interface SocketContextProviderProps {
    children: React.ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user?._id) {
            // Initialize socket connection with userId in query
            const socketInstance = io(`http://localhost:5001`, {
                query: {
                    userId: user._id
                },
                transports: ['websocket', 'polling'],
                withCredentials: true,
            });
            console.log("🚀 ~ SocketContextProvider ~ socketInstance:", socketInstance)

            socketInstance.on('connection', () => {
                console.log('✅ Socket connected:', socketInstance.id);
            });

            // Listen for online users updates
            socketInstance.on('getOnlineUsers', (users: string[]) => {
                console.log('👥 Online users:', users);
                setOnlineUsers(users);
            });

            socketInstance.on('disconnect', () => {
                console.log('❌ Socket disconnected');
            });

            socketInstance.on('connect_error', (error) => {
                console.error('🔴 Socket connection error:', error);
            });

            setSocket(socketInstance);

            // Cleanup on unmount
            return () => {
                console.log('🧹 Cleaning up socket connection');
                socketInstance.close();
            };
        } else {
            // If user logs out, close socket connection
            if (socket) {
                socket.close();
                setSocket(null);
                setOnlineUsers([]);
            }
        }
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};