import { getMessages } from '@/redux/actions/messages/messagesActions';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MessageInput from '@/componets/MessageInput';
import ChatHeader from '@/componets/ChatHeader';
import Loader from '@/componets/Loader';
import FormattedDateTime from '@/componets/FormattedDateTime';

export default function ChatContainer() {
    const { selectedUser, messages, messagesLoading, messagesError } = useSelector((state: RootState) => state.message);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessages(selectedUser._id))
                .unwrap()
                .catch((error) => {
                    toast.error(error || "Failed to load messages!");
                });
        }
    }, [selectedUser?._id, dispatch]);

    return (
        <div className="w-[80%] h-[calc(100vh-4rem)] p-4 relative flex flex-col">
            <ChatHeader />
            <hr className="text-gray-600 my-2" />

            {/* Message List */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 scrollbar-thin">
                {messagesLoading === 'pending' || messagesLoading === 'idle' ? (
                    <div className="h-full flex justify-center items-center">
                        <Loader />
                    </div>
                ) : messagesLoading === 'succeeded' ? (
                    messages.length > 0 ? (
                        messages.map((message) => {
                            const isSender = message.senderId === user?._id;
                            return (
                                <div
                                    key={message._id}
                                    className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* Avatar (for receiver) */}
                                    {!isSender && (
                                        <Image
                                            src={selectedUser?.profilePic || '/avatar.png'}
                                            alt={selectedUser?.fullname || 'Receiver'}
                                            width={40}
                                            height={40}
                                            className="rounded-full size-8 object-cover"
                                        />
                                    )}

                                    <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                                        {/* Timestamp */}
                                        <FormattedDateTime
                                            date={message?.createdAt}
                                            dateOrTime="time"
                                            className="text-xs text-gray-400 mb-1"
                                        />

                                        {/* Message Image */}
                                        {message.image && (
                                            <div className="max-w-[240px] rounded-2xl overflow-hidden shadow-md mb-1">
                                                <Image
                                                    src={message.image}
                                                    alt="Message image"
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition"
                                                />
                                            </div>
                                        )}

                                        {/* Message Text */}
                                        {message.text && (
                                            <div
                                                className={`px-3 py-2 text-sm rounded-2xl max-w-xs break-words ${
                                                    isSender
                                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        )}

                                        {/* Message footer */}
                                        {isSender && (
                                            <p className="text-[11px] text-gray-400 mt-1">Sent</p>
                                        )}
                                    </div>

                                    {/* Avatar (for sender) */}
                                    {isSender && (
                                        <Image
                                            src={user?.profilePic || '/avatar.png'}
                                            alt={user?.fullname || 'Sender'}
                                            width={40}
                                            height={40}
                                            className="rounded-full size-8 object-cover"
                                        />
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="h-full flex justify-center items-center text-gray-500">
                            <div className="flex flex-col items-center text-center space-y-1">
                                <p>
                                    No chat found with <span className="font-semibold">{selectedUser?.fullname}</span>!
                                </p>
                                <p>Start the conversation 👋</p>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-red-500">Error: {messagesError}</p>
                    </div>
                )}
            </div>

            {/* Message Input */}
            <div className="mt-4">
                <MessageInput />
            </div>
        </div>
    );
}
