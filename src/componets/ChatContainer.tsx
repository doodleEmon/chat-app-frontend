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

export default function ChatContainer() {
    const { selectedUser: receiver, messages, messagesLoading } = useSelector((state: RootState) => state.message);
    const { user: sender } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchMessages = async () => {
            if (receiver?._id) {
                const res = await dispatch(getMessages(receiver?._id));
                if (getMessages.fulfilled.match(res)) {
                    dispatch(setMessages(res.payload as MessageResponse[]));
                } else {
                    const errorMessage = res.payload as string || "Login failed!";
                    toast.error(errorMessage);
                }
            }
        }

        fetchMessages();
    }, [receiver?._id, dispatch]);

    return (
        <div className="w-[80%] h-full p-4 relative">
            <ChatHeader />
            <hr className='text-gray-600 my-2' />
            <div>
                {
                    messages && messages.map((message) => (
                        <div key={message._id} className={`chat ${message.receiverId === receiver?._id ? 'chat-start' : 'chat-end'}`}>
                            <div className="chat-image avatar">
                                <div className="size-8 rounded-full">
                                    <Image
                                        src={message.receiverId === receiver?._id ? receiver?.profilePic : sender?.profilePic || '/avatar.png'}
                                        alt={message.receiverId === receiver?._id ? receiver?.fullname : sender?.fullname || 'Receiver profile picture.'}
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            </div>
                            <div>

                            </div>
                            <div className="chat-header">
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble bg-slate-600 px-2 pt-1 text-sm">
                                {message.text}
                            </div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    ))
                }

                {/* <div>
                    {
                        messages.map((message, index) => (
                            <div key={index} className={`chat chat-end`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <Image
                                            src={sender?.profilePic || '/avatar.png'}
                                            alt={sender?.fullname || 'Sender profile picture.'}
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                                <div className="chat-footer opacity-50">Seen at 12:46</div>
                            </div>
                        ))
                    }
                </div> */}
            </div>
            <MessageInput />
        </div>
    )
}
