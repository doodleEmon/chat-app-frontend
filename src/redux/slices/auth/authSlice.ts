import { AuthState } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})