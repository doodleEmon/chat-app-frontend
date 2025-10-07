'use client'

import { RootState } from '@/redux/store';
import Image from 'next/image';
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const { users } = useSelector((state: RootState) => state.message)

    return (
        <div className="w-[25%] pt-5 pb-12 pl-5 pr-0.5 bg-[#1D232A] border-r border-gray-700">
            <p className="flex items-center gap-x-2 pl-4">
                <span className="font-bold text-lg">Chats</span>
            </p>
            <div className='w-full pr-2 mt-4 relative'>
                <input className='bg-slate-600 py-3 pl-10 pr-3 w-full outline-white focus:outline-1 rounded-lg' type="text" name="" id="" placeholder='Search user to chat' />
                <BiSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
            </div>
            <div className="h-full overflow-hidden overflow-y-scroll mt-4 mb-24 space-y-2 scrollbar-thin">
                {
                    users.map((user, index) => (
                        <div key={index} className="flex items-center gap-x-4 py-2 px-3 hover:bg-slate-700 cursor-pointer">
                            <div className="size-9 object-cover border rounded-full">
                                <Image className="size-full rounded-full" src={user.profilePic || '/avatar.png'} alt={user.fullname} height={1000} width={1000} />
                            </div>
                            <div className="flex flex-col justify-center tracking-tight">
                                <p className="font-semibold">{user.fullname}</p>
                                <p className="text-sm">Online</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
