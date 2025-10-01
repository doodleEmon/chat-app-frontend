import { apiCall } from "@/services/api";
import { LoginDataType, SignupDataType } from "@/type";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"

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

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginDataType, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/login", "POST", loginData)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/check", "GET")
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/logout", "POST")
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)