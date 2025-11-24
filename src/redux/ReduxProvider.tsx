// 'use client'

// import React, { useEffect } from 'react'
// import { Provider, useDispatch } from 'react-redux'
// import { AppDispatch, store } from '@/redux/store'
// import { checkAuth } from '@/redux/actions/auth/authActions';
// import { setUser } from '@/redux/slices/auth/authSlice';

// export default function ReduxProvider({ children }: { children: React.ReactNode }) {

//     function HydrateUser() {
//         const dispatch = useDispatch<AppDispatch>();

//         useEffect(() => {
//             const loadUser = async () => {
//                 try {
//                     await dispatch(checkAuth());
//                 } catch {
//                     dispatch(setUser(null));
//                 }
//             };
//             loadUser();
//         }, [dispatch]);

//         return null;
//     }

//     return (
//         <Provider store={store}>
//             <HydrateUser />
//             {children}
//         </Provider>
//     )
// }



'use client'

import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState, store } from '@/redux/store'
import { checkAuth } from '@/redux/actions/auth/authActions';
import { setUser } from '@/redux/slices/auth/authSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

    function HydrateUser() {
        const dispatch = useDispatch<AppDispatch>();
        const { user } = useSelector((state: RootState) => state.auth);
        const [isChecking, setIsChecking] = useState(true);

        useEffect(() => {
            const loadUser = async () => {
                try {
                    console.log('🔍 HydrateUser: Checking auth...');
                    await dispatch(checkAuth()).unwrap();
                    console.log('✅ HydrateUser: Auth verified');
                } catch (error) {
                    console.log('❌ HydrateUser: Not authenticated');
                    dispatch(setUser(null));
                } finally {
                    setIsChecking(false);
                }
            };

            loadUser();
        }, [dispatch]);

        // Show loading while checking auth
        if (isChecking) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            );
        }

        return null;
    }

    return (
        <Provider store={store}>
            <HydrateUser />
            {children}
        </Provider>
    )
}
