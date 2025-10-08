import React from 'react'
import Sidebar from '@/componets/Sidebar'
import ChatContainer from '@/componets/ChatContainer'

export default function HomeContainer() {
    return (
        <div className="w-full h-[calc(100vh-4rem)] flex">
            <Sidebar />
            <ChatContainer />
        </div>
    )
}
