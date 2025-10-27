'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Sidebar from '@/componets/Sidebar';
import EmptyChatContainer from '@/componets/EmptyChatContainer';
import ChatContainer from '@/componets/ChatContainer';

export default function HomeContainer() {
  const { selectedUser } = useSelector((state: RootState) => state.message);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Sidebar */}
      <div
        className={`border-gray-700 md:border-r 
          ${selectedUser ? 'hidden md:block md:w-80' : 'w-full md:w-80'}
        `}
      >
        <Sidebar />
      </div>

      {/* Chat Container */}
      <div className={`flex-1 ${!selectedUser ? 'hidden md:flex md:items-center md:justify-center' : 'flex md:items-center md:justify-center'}`}>
        {!selectedUser ? <EmptyChatContainer /> : <ChatContainer />}
      </div>
    </div>
  )
}
