import React from 'react'
import { BiMessage } from 'react-icons/bi'

export default function ChatContainer() {
    return (
        <div className="w-[80%] h-full flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-3">
                <div className="p-4 bg-blue-500 rounded-lg">
                    <BiMessage size={32} className="text-white" />
                </div>
                <p className="text-lg font-semibold">Chat with ChattyFy</p>
                <p className="text-sm">Send and receive message without keeping your phone online.</p>
            </div>
        </div>
    )
}
