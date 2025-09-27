import { apiCall } from "@/services/api";
import { AuthResponse, SignupDataType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const signUp = createAsyncThunk(
    'auth/signup',
    async (formData: SignupDataType, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/signup", "POST", formData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
)