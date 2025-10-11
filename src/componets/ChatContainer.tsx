import { getMessages } from '@/redux/actions/messages/messagesActions';
import { setMessages } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { MessageResponse } from '@/types/messages';
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
            <hr className='text-gray-600 my-2' />
            <div className='flex-1 overflow-y-auto scrollbar-thin px-4'>
                {
                    messagesLoading === 'pending' || messagesLoading === 'idle' ?
                        <div className='size-full flex justify-center items-center'>
                            <Loader />
                        </div>
                        : messagesLoading === 'succeeded' ?
                            messages.length > 0 ? messages.map((message) => (
                                <div key={message._id} className={`chat ${message.senderId === user?._id ? 'chat-end' : 'chat-start'}`}>
                                    <div className="chat-image avatar">
                                        <div className="size-8 rounded-full">
                                            <Image
                                                src={
                                                    message.senderId === user?._id
                                                        ? user?.profilePic || '/avatar.png'
                                                        : selectedUser?.profilePic || '/avatar.png'
                                                }
                                                alt={(message.senderId === user?._id ? user?.fullname : selectedUser?.fullname) ?? 'Receiver profile picture.'}
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className="chat-header">
                                        <FormattedDateTime
                                            date={message?.createdAt}
                                            dateOrTime='time'
                                            className="text-xs opacity-50"
                                        />
                                    </div>
                                    <div className="chat-bubble bg-slate-600 px-2 pt-1 text-sm text-white">
                                        {message.text && message.text}
                                    </div>
                                    <div className="chat-footer opacity-50">{message.senderId === user?._id ? 'Sent' : ''}</div>
                                </div>
                            )) : (
                                <div className='size-full flex justify-center items-center'>
                                    <div className='flex flex-col items-center'>
                                        <p>
                                            No chat found with <span className='font-bold'>{selectedUser?.fullname}</span>!
                                        </p>
                                        <p>Let's chat.</p>
                                    </div>
                                </div>
                            ) :
                            <div className='size-full flex items-center justify-center'>
                                <p className='text-red-500'>Error: {messagesError}</p>
                            </div>
                }

            </div>
            <MessageInput />
        </div>
    )
}
