'use client'

import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { AppDispatch, store } from '@/redux/store'
import { checkAuth } from '@/redux/actions/auth/authActions';
import { setUser } from '@/redux/slices/auth/authSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

    function HydrateUser() {
        const dispatch = useDispatch<AppDispatch>();

        useEffect(() => {
            const loadUser = async () => {
                try {
                    const res = await dispatch(checkAuth());
                    console.log("🚀 ~ Redux-provider ~ checkAuth:", res);
                } catch {
                    dispatch(setUser(null));
                }
            };
            loadUser();
        }, [dispatch, checkAuth]);

        return null;
    }

    return (
        <Provider store={store}>
            <HydrateUser />
            {children}
        </Provider>
    )
}