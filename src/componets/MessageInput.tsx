'use client';

import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { IoSendSharp } from 'react-icons/io5'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function MessageInput() {
    const [text, setText] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef(null);
    const diapatch = useDispatch<AppDispatch>();

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
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current = null
    }

    const handleSubmitMessage = () => {

    }

    return (
        <div className='w-full h-full'>
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
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
            <form onSubmit={handleSubmitMessage} className='w-full p-4 flex items-center gap-x-6'>
                <input
                    className='flex-1 outline-white focus:outline-1 py-3 px-6 rounded-lg bg-slate-700'
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
                    disabled={text.trim() === "" && imagePreview === null}
                >
                    <IoSendSharp size={20} className={`${text.trim() === "" && imagePreview === null}`} />
                </button>
            </form>
        </div>
    )
}
