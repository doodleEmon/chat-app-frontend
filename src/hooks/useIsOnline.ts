import { useSocketContext } from "@/lib/SocketContext";

export const useIsOnline = (userId?: string) => {
    const { onlineUsers } = useSocketContext();

    if (!userId) return false;
    
    return onlineUsers.includes(userId);
};