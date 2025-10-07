import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/slices/auth/authSlice'
import messageReducer from '@/redux/slices/messages/messageSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch