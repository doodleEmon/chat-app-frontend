import { apiCall } from "@/services/api";
import { Message } from "@/types/messages";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getUsers = createAsyncThunk(
    'chat/users',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/messages/users", "GET");
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
)

export const getMessages = createAsyncThunk(
    'chat/messages',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await apiCall(`/messages/${id}`, "GET");
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
)

export const sendMessages = createAsyncThunk(
    'chat/sendMessages',
    async ({ receiverId, text, image }: Message, { rejectWithValue }) => {
        try {
            const data = await apiCall(`/send/${receiverId}`, "POST", { text, image });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
)