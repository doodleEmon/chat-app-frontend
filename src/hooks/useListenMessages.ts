import { useEffect } from 'react';
import { MessageResponse } from '@/types/messages';
import { useSocketContext } from '@/lib/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addSocketMessage } from '@/redux/slices/messages/messageSlice';

/**
 * Custom hook to listen for incoming messages via Socket.IO
 * This hook should be used in your chat component/page
 */
export const useListenMessages = () => {
    const { socket } = useSocketContext();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!socket) return;

        // Listen for new messages from backend
        const handleNewMessage = (message: MessageResponse) => {

            // Optional: Play notification sound
            // try {
            //     const notificationSound = new Audio('/notification.mp3');
            //     notificationSound.play().catch(err =>
            //         console.log('Sound notification disabled or failed:', err)
            //     );
            // } catch (error) {
            //     console.log('Notification sound not available');
            // }

            // Add message to Redux store
            dispatch(addSocketMessage(message));
        };

        // Register the event listener
        socket.on('newMessage', handleNewMessage);

        // Cleanup: Remove listener when component unmounts
        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, dispatch]);
};