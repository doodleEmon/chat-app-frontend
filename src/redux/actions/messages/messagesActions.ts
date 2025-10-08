import { apiCall } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getUsers = createAsyncThunk(
    'chat/users',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/messages/users", "GET");
            console.log("🚀 ~ data:", data)
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
            const data = await apiCall(`/message/${id}`, "GET");
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
)

// export const sendMessages = createAsyncThunk(
//     'chat/sendMessages',
//     async ({ id, text, image }, { rejectWithValue }) => {
//         try {
//             const data = await apiCall(`/send/${id}`, "POST", { text, image });
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     },
// )