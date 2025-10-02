'use client'

import { RootState } from '@/redux/store'
import Image from 'next/image'
import React from 'react'
import { BiCamera, BiUser } from 'react-icons/bi'
import { FaCamera } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className='flex items-center justify-center p-4 lg:p-0'>
      <div className='w-lg mt-8'>
        <div className='bg-slate-800 p-6 rounded-lg'>
          <h3 className='text-center text-xl font-bold'>Profile</h3>
          <p className='text-sm text-center mt-2 text-slate-400'>Your profile information</p>
          <div className='mt-8 flex justify-center'>
            <div className='size-32 rounded-full object-cover relative p-1 border-2'>
              <Image src={user?.profilePic || '/avatar.png'} alt={user?.fullname || 'User profile picture'} height={1000} width={1000} />
              <label className='absolute right-0.5 bottom-0 z-50 bg-slate-500 p-2 rounded-full cursor-pointer'>
                <BiCamera size={16} />
              </label>
            </div>
          </div>
          <p className='text-sm text-slate-400 text-center mt-4'>Click the camera icon to update your photo</p>
          <div className='mt-8 space-y-4'>
            <div className='relative'>
              <BiUser size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 z-50" />
              <input
                type="fullname"
                className="input focus:outline-none w-full pl-8"
                placeholder="John Doe"
                value={user?.fullname}
              // onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />
            </div>
            <div className='relative'>
              <MdOutlineEmail size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 z-50" />
              <input
                type="text"
                className="input focus:outline-none w-full pl-8"
                placeholder="john@gmail.com"
                value={user?.email}
              // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className='bg-slate-800 p-6 mt-4 rounded-lg space-y-3'>
          <p className='text-xl font-bold'>Profile Information</p>
          <div className='flex items-center justify-between'>
            <p className=''>Member Since</p>
            <p className=''>25 February, 2025</p>
          </div>
          <hr />
          <div className='flex items-center justify-between'>
            <p className=''>Account Status</p>
            <p className='text-green-500 font-bold'>Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
