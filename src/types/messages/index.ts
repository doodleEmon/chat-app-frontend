import { AuthResponse } from "@/types/auth/index";

export interface Message {
    receiverId: string,
    text?: string | "",
    image?: string | ""
}

export interface MessageResponse {
    _id: string,
    senderId: string,
    receiverId: string,
    text?: string,
    image?: string,
    createdAt: Date,
    updatedAt: Date
}

export interface MessageState {
    users: AuthResponse[],
    messages: MessageResponse[],
    usersLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
    messagesLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
    selectedUser: AuthResponse | null,
    usersError: string | null,
    messagesError: string | null,
}