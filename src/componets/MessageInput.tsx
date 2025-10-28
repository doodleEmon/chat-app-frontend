'use client';

import { sendMessages } from '@/redux/actions/messages/messagesActions';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { MdOutlineAddPhotoAlternate, MdOutlineEmojiEmotions } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/componets/Loader';
import EmojiPicker from 'emoji-picker-react';

interface MessageInputProps {
    imagePreview: string;
    setImagePreview: (url: string) => void;
    removeImage: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    setIsOpenEmoji: (state: boolean) => void;
    isOpenEmoji: boolean;
}

export default function MessageInput({ imagePreview, setImagePreview, removeImage, fileInputRef, setIsOpenEmoji, isOpenEmoji }: MessageInputProps) {
    const [text, setText] = useState<string | "">("");
    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser, messagesSendingLoading } = useSelector((state: RootState) => state.message);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files && e.target.files[0];

        if (!file?.type.startsWith("image/")) {
            toast.error('Please select an image file.');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('reader.result->  ', reader.result);
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    const handleOpenEmoji = () => {
        setIsOpenEmoji(!isOpenEmoji);
    }

    const handleSubmitMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;

        if (!selectedUser) return;

        const formData = {
            receiverId: selectedUser._id,
            text: text.trim(),
            image: imagePreview
        }

        const res = await dispatch(sendMessages(formData));

        if (sendMessages.fulfilled.match(res)) {
            setText("");
            removeImage();
        } else {
            const errorMessage = res.payload as string || "Have some issue!";
            toast.error(errorMessage);
        }

    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmitMessage} className='w-full px-2 md:px-4 pt-2 flex items-center gap-x-4 md:gap-x-6'>
                <input
                    className='flex-1 py-3 px-6 border border-gray-500 focus:outline-none focus:border-white rounded-lg '
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Type a message...'
                />


                <button onClick={handleOpenEmoji} className='cursor-pointer'>
                    <MdOutlineEmojiEmotions size={20} />
                </button>

                <label htmlFor='image_send' className='cursor-pointer' title='Click to choose image file'>
                    <MdOutlineAddPhotoAlternate size={22} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        id="image_send"
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageChange}
                    />
                </label>
                {
                    messagesSendingLoading === "pending" ? (
                        <div className="loading loading-spinner loading-sm"></div>
                    ) : (
                        <button
                            type='submit'
                            className='cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed'
                            disabled={text.trim() === "" && imagePreview === ""}
                        >
                            <IoSendSharp size={20} className={`${text.trim() === "" && imagePreview === null}`} />
                        </button>
                    )
                }
            </form>
        </div>
    )
}
