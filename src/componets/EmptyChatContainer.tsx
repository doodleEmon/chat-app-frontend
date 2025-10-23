import React from 'react'
import { BiMessage } from 'react-icons/bi'

export default function EmptyChatContainer() {
    return (
        <div className="w-[80%] h-full justify-center p-4 flex flex-col items-center space-y-3">
            <div className="p-4 bg-blue-500 rounded-lg animate-bounce">
                <BiMessage size={32} className="text-white" />
            </div>
            <p className="text-lg font-semibold">Welcome to Chattyfy!</p>
            <p className="text-sm">Select a conversation from sidebar to start chatting.</p>
        </div>
    )
}
