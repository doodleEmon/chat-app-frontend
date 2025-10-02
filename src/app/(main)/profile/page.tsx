'use client'

import { RootState } from '@/redux/store'
import Image from 'next/image'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { FaCamera } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className='flex items-center justify-center'>
      <div className='w-lg border p-6 mt-8'>
        <h3 className='text-center text-xl font-bold'>Profile</h3>
        <p className='text-sm text-center mt-3'>Your profile information</p>
        <div className='mt-8 flex justify-center'>
          <div className='size-32 rounded-full object-cover relative'>
            <Image src={user?.profilePic || '/avatar.png'} alt={user?.fullname || 'User profile picture'} height={1000} width={1000} />
            <label className='absolute right-3 bottom-2 z-50'>
              <FaCamera size={20} />
            </label>
          </div>
        </div>
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
    </div>
  )
}
