import { getMessages, getUsers } from "@/redux/actions/messages/messagesActions";
import { AuthResponse } from "@/types/auth";
import { Message, MessageState } from "@/types/messages";
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
        setMessages: (state, action: PayloadAction<Message[] | []>) => {
            state.messages = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<AuthResponse>) => {
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
                state.messages = action.payload as Message[];
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.messagesLoading = 'failed';
                state.messagesError = action.payload as string;
            })
    }
})

export const { setUsers, setMessages, setSelectedUser } = messageSlice.actions;
export default messageSlice.reducer; 