import { getMessages, getUsers, sendMessages } from "@/redux/actions/messages/messagesActions";
import { AuthResponse } from "@/types/auth";
import { MessageState, MessageResponse } from "@/types/messages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageState = {
    users: [],
    messages: [],
    usersLoading: 'idle',
    messagesLoading: 'idle',
    messagesSendingLoading: 'idle',
    selectedUser: null,
    usersError: null,
    messagesError: null,
    messagesSendingError: null,
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<AuthResponse | AuthResponse[]>) => {
            const usersToAdd = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];

            state.users.unshift(...usersToAdd);
        },
        setRemoveUser: (state, action: PayloadAction<AuthResponse>) => {
            state.users = state.users.filter(
                user => user?._id !== action.payload?._id
            );
        },
        setMessages: (state, action: PayloadAction<MessageResponse[] | []>) => {
            state.messages = action.payload as MessageResponse[];
        },
        setSelectedUser: (state, action: PayloadAction<AuthResponse | null>) => {
            state.selectedUser = action.payload;
        },

        // 🔥 NEW: Move user to top of the list
        moveUserToTop: (state, action: PayloadAction<string>) => {
            const userId = action.payload;
            const userIndex = state.users.findIndex(u => u._id === userId);

            if (userIndex > 0) {
                // Only move if user exists and is not already at top
                const [user] = state.users.splice(userIndex, 1);
                state.users.unshift(user);
            } else if (userIndex === -1) {
                // User not in list - will be added when messages are fetched
                console.log(`User ${userId} not found in users list`);
            }
        },

        // 🔥 Add incoming socket message in real-time
        addSocketMessage: (state, action: PayloadAction<MessageResponse>) => {
            // Check if message is for the currently selected user
            const incomingMessage = action.payload;
            const currentUserId = state.selectedUser?._id;

            // Only add if the message is part of current conversation
            if (
                incomingMessage.senderId === currentUserId ||
                incomingMessage.receiverId === currentUserId
            ) {
                state.messages.push(incomingMessage);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get users
            .addCase(getUsers.pending, (state) => {
                state.usersLoading = 'pending'
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.usersLoading = 'succeeded';

                const usersToAdd = Array.isArray(action.payload)
                    ? action.payload
                    : [action.payload];

                state.users = [...usersToAdd];
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.usersLoading = 'failed';
                state.usersError = action.payload as string;
            })

            //get messages
            .addCase(getMessages.pending, (state) => {
                state.messagesLoading = 'pending'
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messagesLoading = 'succeeded';
                state.messages = action.payload as MessageResponse[];
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.messagesLoading = 'failed';
                state.messagesError = action.payload as string;
            })

            // send messages
            .addCase(sendMessages.pending, (state) => {
                state.messagesSendingLoading = 'pending';
                state.messagesSendingError = null;
            })
            .addCase(sendMessages.fulfilled, (state, action) => {
                console.log('action.payload.sendMessages', action.payload);
                state.messagesSendingLoading = 'succeeded';
                state.messages = [...state.messages, action.payload] as MessageResponse[];
            })
            .addCase(sendMessages.rejected, (state, action) => {
                state.messagesSendingLoading = 'failed';
                state.messagesSendingError = action.payload as string;
            })
    }
})

export const { setUsers, setMessages, setSelectedUser, setRemoveUser, addSocketMessage, moveUserToTop } = messageSlice.actions;
export default messageSlice.reducer; 