import { AuthResponse } from "@/types/auth/index";

export interface MessageResponse {
    senderId: string,
    receiverId: string,
    text?: string,
    image?: string
}

export interface Message {
    receiverId: string,
    text?: string,
    image?: string
}

export interface MessageState {
    users: AuthResponse[] | [],
    messages: Message[] | [],
    usersLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
    messagesLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
    selectedUser: AuthResponse | null,
    usersError: string | null,
    messagesError: string | null,
}