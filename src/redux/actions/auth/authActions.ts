import { apiCall } from "@/services/api";
import { LoginDataType, SignupDataType } from "@/types/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const signUp = createAsyncThunk(
    'auth/signup',
    async (formData: SignupDataType, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/signup", "POST", formData);

            // ⚠️ Wait for cookie to be set in browser
            await new Promise(resolve => setTimeout(resolve, 150));

            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Signup failed.');
        }
    },
)

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginDataType, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/login", "POST", loginData);

            // ⚠️ Wait for cookie to be set in browser
            await new Promise(resolve => setTimeout(resolve, 150));

            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Login failed.');
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/check", "GET");

            // ⚠️ Wait for cookie to be set in browser
            await new Promise(resolve => setTimeout(resolve, 150));

            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Check auth failed!');
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/logout", "POST")
            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Logout failed!');
        }
    }
)

export const updateProfile = createAsyncThunk(
    'auth/update_profile',
    async (profilePic: string | null, { rejectWithValue }) => {
        try {
            const data = await apiCall("/auth/update-profile", "PUT", { profilePic })
            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Profile update failed!');
        }
    }
)

export const searchUsers = createAsyncThunk(
    'auth/search_users',
    async (query: string, { rejectWithValue }) => {
        try {
            const data = await apiCall(`/auth/search?query=${encodeURIComponent(query)}`, "GET")
            return data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error) || 'Search user failed!');
        }
    }
)