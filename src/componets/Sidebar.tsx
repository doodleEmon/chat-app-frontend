'use client'

import { getUsers } from '@/redux/actions/messages/messagesActions';
import { setSelectedUser, setUsers } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthResponse } from '@/types/auth';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SidebarSkeleton from './SidebarSkeleton';

export default function Sidebar() {
    const { users, usersLoading, selectedUser } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await dispatch(getUsers());

            if (getUsers.fulfilled.match(res)) {
                dispatch(setUsers(res.payload as AuthResponse[]));
            } else {
                const errorMessage = res.payload as string || "Loading user failed!";
                toast.error(errorMessage);
            }
        }
        fetchUsers();
    }, [dispatch])

    return (
        <div className="w-[25%] pt-5 pb-12 pl-5 pr-0.5 bg-[#1D232A] border-r border-gray-700">
            <div className='w-full pr-2 relative'>
                <input className='bg-slate-600 py-3 pl-10 pr-3 w-full outline-white focus:outline-1 rounded-lg' type="text" name="" id="" placeholder='Search user to chat' />
                <BiSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
            </div>

            <div className="h-full overflow-hidden overflow-y-scroll mt-4 mb-24 space-y-2 scrollbar-thin">
                {
                    usersLoading === "idle" || usersLoading === "pending" ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <SidebarSkeleton key={index} />
                        ))
                    ) : users.length > 0 ? (
                        users.map((user, index) => (
                            <div
                                key={user._id}
                                className={`flex items-center gap-x-4 py-2 px-3 hover:bg-slate-700 cursor-pointer rounded-lg ${selectedUser?._id === user._id ? 'bg-slate-700' : ''}`}
                                onClick={() => dispatch(setSelectedUser(user))}
                            >
                                <div className="size-9 object-cover border rounded-full">
                                    <Image
                                        className="size-full rounded-full"
                                        src={user.profilePic || "/avatar.png"}
                                        alt={user.fullname}
                                        height={1000}
                                        width={1000}
                                    />
                                </div>
                                <div className="flex flex-col justify-center tracking-tight">
                                    <p className="font-semibold">{user.fullname}</p>
                                    <p className="text-sm">Online</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 mt-4">No user found.</p>
                    )
                }
            </div>

        </div>
    )
}
