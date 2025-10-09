import { getMessages, getUsers, sendMessages } from "@/redux/actions/messages/messagesActions";
import { AuthResponse } from "@/types/auth";
import { Message, MessageState, MessageResponse } from "@/types/messages";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageState = {
    users: [],
    messages: [],
    usersLoading: 'idle',
    messagesLoading: 'idle',
    selectedUser: null,
    usersError: null,
    messagesError: null,
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<AuthResponse[] | []>) => {
            state.users = action.payload;
        },
        setMessages: (state, action: PayloadAction<MessageResponse[] | []>) => {
            state.messages = action.payload as MessageResponse[];
        },
        setSelectedUser: (state, action: PayloadAction<AuthResponse | null>) => {
            state.selectedUser = action.payload;
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
                state.users = action.payload as AuthResponse[];
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
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.messagesLoading = 'succeeded';
                state.messages = action.payload as MessageResponse[];
            })
            .addCase(sendMessages.rejected, (state, action) => {
                state.messagesLoading = 'failed';
                state.messagesError = action.payload as string;
            })
    }
})

export const { setUsers, setMessages, setSelectedUser } = messageSlice.actions;
export default messageSlice.reducer; 