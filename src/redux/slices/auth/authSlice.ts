import { checkAuth, login, logout, signUp, updateProfile } from "@/redux/actions/auth/authActions";
import { AuthResponse, AuthState } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
    user: null,
    loading: 'idle',
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthResponse | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signUp.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload as AuthResponse;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })

            // login
            .addCase(login.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload as AuthResponse;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })

            // check auth
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload as AuthResponse;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })

            // logout
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })

            // update profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload as AuthResponse;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer; 