'use client'

import React from 'react'
import Sidebar from '@/componets/Sidebar'
import ChatContainer from '@/componets/ChatContainer'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import EmptyChatContainer from '@/componets/EmptyChatContainer'

export default function HomeContainer() {
    const { selectedUser } = useSelector((state: RootState) => state.message);
    return (
        <div className="w-full h-[calc(100vh-4rem)] flex">
            <Sidebar />
            {
                !selectedUser ? <EmptyChatContainer /> : <ChatContainer />
            }
        </div>
    )
}
