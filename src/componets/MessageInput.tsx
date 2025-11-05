'use client';

import { sendMessages } from '@/redux/actions/messages/messagesActions';
import { moveUserToTop } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { MdOutlineAddPhotoAlternate, MdOutlineEmojiEmotions } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface MessageInputProps {
    imagePreview: string;
    setImagePreview: (url: string) => void;
    removeImage: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    // setIsEmojiOpen: (state: boolean) => void;
    setIsEmojiOpen: React.Dispatch<SetStateAction<boolean>>;
    isEmojiOpen: boolean;
    selectedEmoji: string[] | string;
    setSelectedEmoji: (state: string) => void;
}

export default function MessageInput({ imagePreview, setImagePreview, removeImage, fileInputRef, setIsEmojiOpen, isEmojiOpen, selectedEmoji, setSelectedEmoji }: MessageInputProps) {
    const [text, setText] = useState<string | "">("");
    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser, messagesSendingLoading } = useSelector((state: RootState) => state.message);
    const textInputRef = useRef<HTMLInputElement>(null);

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
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    const handleOpenEmoji = (e: React.FormEvent) => {
        e.preventDefault();

        setIsEmojiOpen(true);
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
            dispatch(moveUserToTop(selectedUser._id));
            setText("");
            removeImage();
            setIsEmojiOpen(false);
            setSelectedEmoji("");
        } else {
            const errorMessage = res.payload as string || "Have some issue!";
            toast.error(errorMessage);
        }

    }

    // Add emoji to text when selectedEmoji changes
    useEffect(() => {
        if (selectedEmoji) {
            setText((prev) => prev + selectedEmoji);
            setSelectedEmoji(""); // Reset after adding

            // Focus back on input after emoji selection
            textInputRef.current?.focus();
        }
    }, [selectedEmoji, setSelectedEmoji])

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmitMessage} className='w-full px-2 md:px-4 pt-2 flex items-center gap-x-4 md:gap-x-6'>
                <input
                    ref={textInputRef}
                    className='flex-1 py-3 px-6 border border-gray-500 focus:outline-none focus:border-white rounded-lg '
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Type a message...'
                />

                <button
                    type="button"
                    title="Click to add some emoji"
                    onClick={handleOpenEmoji}
                    className={`${isEmojiOpen ? 'text-gray-600 cursor-not-allowed' : 'cursor-pointer text-white'}`}
                    disabled={isEmojiOpen === true}
                >
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
