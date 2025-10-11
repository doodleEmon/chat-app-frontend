'use client';

import { sendMessages } from '@/redux/actions/messages/messagesActions';
import { setMessages } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { MessageResponse } from '@/types/messages';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { IoSendSharp } from 'react-icons/io5'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function MessageInput() {
    const [text, setText] = useState<string | "">("");
    const [imagePreview, setImagePreview] = useState<string | "">("");
    const fileInputRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser } = useSelector((state: RootState) => state.message);

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
        }
    }

    const removeImage = () => {
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current = null;
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
            // clear form
            setText("");
            setImagePreview("");
        } else {
            const errorMessage = res.payload as string || "Have some issue!";
            toast.error(errorMessage);
        }

    }

    return (
        <div className='w-full'>
            {imagePreview && (
                <div className=" px-4 flex items-center gap-2">
                    <div className="relative">
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            width={1000}
                            height={1000}
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center cursor-pointer"
                            type="button"
                        >
                            <ImCross size={9} />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmitMessage} className='w-full px-4 pt-2 flex items-center gap-x-6'>
                <input
                    className='flex-1 py-3 px-6 border border-gray-500 focus:outline-none focus:border-white rounded-lg '
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Type a message...'
                />
                <label htmlFor='image_send' className='cursor-pointer' title='Click to choose image file'>
                    <MdOutlineAddPhotoAlternate size={22} />
                    <input
                        type="file"
                        id="image_send"
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageChange}
                    />
                </label>
                <button
                    type='submit'
                    className='cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed'
                    disabled={text.trim() === "" && imagePreview === ""}
                >
                    <IoSendSharp size={20} className={`${text.trim() === "" && imagePreview === null}`} />
                </button>
            </form>
        </div>
    )
}
