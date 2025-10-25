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
        <div className="flex h-[calc(100vh-4rem)] w-full">
            <div className='h-full w-auto border-r border-gray-700'>
                <Sidebar />
            </div>
            <div className='flex-1 flex items-center justify-center'>
                {
                    !selectedUser ? <EmptyChatContainer /> : <ChatContainer />
                }
            </div>
        </div>
    )
}
