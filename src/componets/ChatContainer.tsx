import { getMessages } from '@/redux/actions/messages/messagesActions';
import { setMessages, setSelectedUser } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { Message } from '@/types/messages';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { IoSendSharp } from 'react-icons/io5';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MessageInput from './MessageInput';

export default function ChatContainer() {
    const { selectedUser, messages, messagesLoading } = useSelector((state: RootState) => state.message);
    const receiverId = selectedUser?._id;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchMessages = async () => {
            if (receiverId) {
                const res = await dispatch(getMessages(receiverId));
                if (getMessages.fulfilled.match(res)) {
                    dispatch(setMessages(res.payload as Message[]));
                } else {
                    const errorMessage = res.payload as string || "Login failed!";
                    toast.error(errorMessage);
                }
            }
        }

        fetchMessages();
    }, [receiverId, messages]);

    return (
        <div className="w-[80%] h-full p-4 relative">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                    <div className='size-10 object-cover rounded-full'>
                        <Image className='rounded-full' src={selectedUser?.profilePic || '/avatar.png'} alt='' height={1000} width={1000} />
                    </div>
                    <div className='flex flex-col gap-0'>
                        <h3 className='text-base font-semibold'>{selectedUser?.fullname}</h3>
                        <p className='text-sm'>Online</p>
                    </div>
                </div>
                <button onClick={() => dispatch(setSelectedUser(null))} className='cursor-pointer'>
                    <ImCross size={12} />
                </button>
            </div>
            <hr className='text-gray-600 my-2' />
            <div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">You were the Chosen One!</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
            </div>
            <MessageInput />
        </div>
    )
}
