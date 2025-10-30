import { getMessages } from '@/redux/actions/messages/messagesActions';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MessageInput from '@/componets/MessageInput';
import ChatHeader from '@/componets/ChatHeader';
import Loader from '@/componets/Loader';
import FormattedDateTime from '@/componets/FormattedDateTime';
import { ImCross } from 'react-icons/im';
import { useListenMessages } from '@/hooks/useListenMessages';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

export default function ChatContainer() {
    const { selectedUser, messages, messagesLoading, messagesError } = useSelector((state: RootState) => state.message);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
    const [isImageClicked, setIsImageClicked] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const closeEmojiRef = useRef<HTMLInputElement>(null);

    // 🔥 NEW: Listen for socket messages in real-time
    useListenMessages();

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessages(selectedUser._id))
                .unwrap()
                .catch((error) => {
                    toast.error(error || "Failed to load messages!");
                });
        }
    }, [selectedUser?._id, dispatch]);

    // 🔥 NEW: Auto-scroll to bottom when new message arrives
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleCloseModal = () => {
        setIsImageClicked((pre) => !pre);
        setSelectedImageUrl("");
    }

    const handleCloseImagePreview = () => {
        setImagePreview("");
    }

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setSelectedEmoji((pre) => pre + emojiData.emoji);
    }

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Check if click is outside emoji picker container
            if (isEmojiOpen && !target.closest('.emoji-container')) {
                setIsEmojiOpen(false);
            }
        };

        if (isEmojiOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEmojiOpen]);

    return (
        <div className="relative p-4 flex flex-col h-full w-full" ref={closeEmojiRef}>
            <ChatHeader />
            <hr className="text-gray-600 my-2" />

            {/* Message List */}
            <div className="flex-1 overflow-y-scroll px-4 space-y-4 scrollbar-thin pt-2">
                {messagesLoading === 'pending' || messagesLoading === 'idle' ? (
                    <div className="h-full flex justify-center items-center">
                        <Loader />
                    </div>
                ) : messagesLoading === 'succeeded' ? (
                    messages.length > 0 ? (
                        <>
                            {messages.map((message) => {
                                const isSender = message.senderId === user?._id;
                                return (
                                    <div
                                        key={message._id}
                                        className={`flex items-end gap-2 scrollbar-thin ${isSender ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {/* Avatar (receiver) */}
                                        {!isSender && (
                                            <Image
                                                src={selectedUser?.profilePic || '/avatar.png'}
                                                alt={selectedUser?.fullname || 'Receiver'}
                                                width={40}
                                                height={40}
                                                className="rounded-full size-8 object-cover"
                                            />
                                        )}

                                        <div className={`flex flex-col ${isSender ? 'items-end justify-center' : 'items-start'}`}>
                                            {/* Message Image */}
                                            {message.image && (
                                                <div onClick={() => {
                                                    setSelectedImageUrl(message.image as string);
                                                    setIsImageClicked((pre) => !pre);
                                                }} className="relative max-w-[240px] rounded-xl overflow-hidden shadow-md mb-1">
                                                    <Image
                                                        src={message.image}
                                                        alt="Message image"
                                                        width={400}
                                                        height={400}
                                                        className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition"
                                                    />
                                                    <FormattedDateTime
                                                        date={message?.createdAt}
                                                        dateOrTime="time"
                                                        className="text-[11px] text-gray-400 absolute right-2 bottom-0.5"
                                                    />
                                                </div>
                                            )}

                                            {/* Message Text */}
                                            {message.text && (
                                                <div
                                                    className={`relative pl-3 pr-[68px] py-1.5 rounded-lg text-sm max-w-lg break-words ${isSender
                                                        ? 'bg-teal-900 text-white rounded-br-none'
                                                        : 'bg-gray-700 text-white rounded-bl-none'
                                                        }`}
                                                >
                                                    {message.text}
                                                    <FormattedDateTime
                                                        date={message?.createdAt}
                                                        dateOrTime="time"
                                                        className="text-[11px] text-gray-400 absolute right-1.5 bottom-0.5"
                                                    />
                                                </div>
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
                            })}
                            {/* 🔥 NEW: Auto-scroll anchor */}
                            <div ref={messagesEndRef} />
                        </>
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
                        <p className="text-red-500">{messagesError}</p>
                    </div>
                )}

            </div>

            <div className='absolute bottom-20 right-8 lg:right-24 w-auto h-auto z-40 emoji-container'>
                <EmojiPicker open={isEmojiOpen} theme={Theme.DARK} onEmojiClick={onEmojiClick} />
            </div>

            {
                imagePreview && <div className='absolute bottom-20 left-8 w-auto h-auto z-40'>
                    <div className="flex items-center gap-2 z-50">
                        <div className="relative">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                                width={1000}
                                height={1000}
                            />
                            <button
                                onClick={handleCloseImagePreview}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-600
                              flex items-center justify-center cursor-pointer text-white"
                                type="button"
                            >
                                <ImCross size={9} />
                            </button>
                        </div>
                    </div>
                </div>
            }

            {/* Modal */}
            {isImageClicked && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative max-w-lg max-h-[80vh] overflow-auto scrollbar-thin"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='bg-gray-700 shadow-2xl rounded'>
                            <Image
                                src={selectedImageUrl}
                                alt="Message image"
                                width={1000}
                                height={1000}
                                className="w-auto h-auto object-contain rounded"
                            />
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 bg-gray-600 text-white rounded-full p-1 cursor-pointer hover:bg-gray-700"
                        >
                            <ImCross size={12} />
                        </button>
                    </div>
                </div>
            )}

            {/* Message Input */}
            <div className="pt-2 w-full h-16">
                <MessageInput imagePreview={imagePreview} setImagePreview={setImagePreview} removeImage={handleCloseImagePreview} fileInputRef={fileInputRef} setIsEmojiOpen={setIsEmojiOpen} isEmojiOpen={isEmojiOpen} selectedEmoji={selectedEmoji} setSelectedEmoji={setSelectedEmoji} />
            </div>
        </div>
    );
}