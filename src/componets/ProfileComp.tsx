'use client'

import { updateProfile } from '@/redux/actions/auth/authActions'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiCamera, BiUser } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function ProfileComp() {

    const { loading, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result as string;
            setSelectedImage(base64Image);
            const res = await dispatch(updateProfile(base64Image));

            if (updateProfile.fulfilled.match(res)) {
                toast.success("Image uploaded successfully!");
            } else {
                const errorMessage = res.payload as string || "Image upload failed!";
                toast.error(errorMessage);
            }
        }
    }

    return (
        <div className='w-lg mb-8 lg:mt-8'>
            <div className='bg-slate-800 p-6 rounded-lg'>
                <h3 className='text-center text-xl font-bold text-white'>Profile</h3>
                <p className='text-sm text-center mt-2 text-slate-400'>Your profile information</p>
                <div className='mt-8 flex justify-center'>
                    <div className='size-32 rounded-full object-contain relative p-1 border-2 border-white'>
                        <Image className='rounded-full size-full' src={selectedImage || user?.profilePic || '/avatar.png'} alt={user?.fullname || 'User profile picture'} height={1000} width={1000} priority={true} />
                        <label htmlFor='avatar_upload' className='absolute right-0.5 bottom-0 z-40 bg-slate-500 p-2 rounded-full cursor-pointer' title='Click to change profile picture'>
                            <BiCamera size={16} className='text-white' />
                            <input
                                type="file"
                                id="avatar_upload"
                                className='hidden'
                                accept='image/*'
                                onChange={handleAvatarUpload}
                            />
                        </label>
                    </div>
                </div>
                <p className='text-sm text-slate-400 text-center mt-4'>{loading === 'pending' ? 'Uploading image...' : 'Click the camera icon to update your photo'}</p>
                <div className='mt-8 space-y-4'>
                    <div className='relative'>
                        <BiUser size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 z-40" />
                        <input
                            type="fullname"
                            className="input focus:outline-none w-full pl-8 border-gray-500 bg-[#1D232A] focus:border-white text-white"
                            placeholder="John Doe"
                            value={user?.fullname || ""}
                            readOnly
                        />
                    </div>
                    <div className='relative'>
                        <MdOutlineEmail size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 z-40" />
                        <input
                            type="text"
                            className="input focus:outline-none w-full pl-8 border-gray-500 bg-[#1D232A] focus:border-white text-white"
                            placeholder="john@gmail.com"
                            value={user?.email || ""}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 p-6 mt-4 rounded-lg space-y-3'>
                <p className='text-xl font-bold text-white'>Profile Information</p>
                <div className='flex items-center justify-between'>
                    <p className='text-white'>Member Since</p>
                    <p className='font-semibold text-white'>{user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                        : ""}</p>
                </div>
                <hr className='text-white' />
                <div className='flex items-center justify-between'>
                    <p className='text-white'>Account Status</p>
                    <p className='text-green-500 font-bold'>Active</p>
                </div>
            </div>
        </div>
    )
}
