'use client'

import { getUsers } from '@/redux/actions/messages/messagesActions';
import { setSelectedUser } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SidebarSkeleton from './SidebarSkeleton';
import { searchUsers } from '@/redux/actions/auth/authActions';
import Loader from './Loader';

export default function Sidebar() {
    const { users, usersLoading, selectedUser } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();
    const [searchText, setSearchText] = useState<string>("");
    // const [searchedUsers, setSearchedUsers] = useState();
    const { searchLoading, searchedUsers, searchedError } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await dispatch(getUsers());

            if (getUsers.rejected.match(res)) {
                const errorMessage = res.payload as string || "Loading user failed!";
                toast.error(errorMessage);
            }
        }
        fetchUsers();
    }, [dispatch])

    // ✅ Memoize trimmed value (ignore spaces)
    const trimmedSearchText = useMemo(() => searchText.trim(), [searchText]);

    // ✅ Memoize search function
    const handleSearch = useCallback(async (query: string) => {
        if (!query) return;
        try {
            await dispatch(searchUsers(query)).unwrap();
        } catch (error) {
            console.error("Search failed:", error);
        }
    }, [dispatch]);

    // ✅ Debounce logic (trigger only when user stops typing)
    useEffect(() => {
        if (!trimmedSearchText) return;

        const timeout = setTimeout(() => {
            handleSearch(trimmedSearchText);
        }, 700); // 700ms after user stops typing

        return () => clearTimeout(timeout);
    }, [trimmedSearchText, handleSearch]);

    return (
        <div className="w-[25%] pt-5 pb-12 pl-5 pr-4 bg-[#1D232A] border-r border-gray-700 relative">
            <div className='w-full relative z-50'>
                <input
                    className='py-3 pl-10 pr-3 w-full bg-[#1D232A] border border-gray-500 rounded-lg focus:outline-none focus:border-white text-white'
                    type="text"
                    placeholder='Search with name or email'
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
                <BiSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            </div>

            <div className={`absolute top-20 w-[89%] h-64 bg-gray-900 border mr-4 transition-opacity duration-300 z-50 rounded overflow-y-auto ${searchText ? 'opacity-100' : 'hidden'}`}>
                {
                    (searchLoading === 'idle' || searchLoading === 'pending') ? (
                        <div className='size-full flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : searchLoading === 'succeeded' ? (
                        searchedUsers.length > 0 ? (
                            <div className='size-full flex items-center justify-center'>
                                <p>Show searched users</p>
                            </div>
                        ) : (
                            <div className='size-full flex items-center justify-center'>
                                <p>No user found</p>
                            </div>
                        )
                    ) : (
                        <p>Something went wrong!</p>
                    )
                }
            </div>

            <div className="h-full w-full overflow-y-scroll mt-4 mb-24 space-y-2 scrollbar-thin">
                {
                    usersLoading === "idle" || usersLoading === "pending" ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <SidebarSkeleton key={index} />
                        ))
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className={`w-full flex items-center gap-x-4 py-2 px-3 cursor-pointer rounded-lg ${selectedUser?._id === user._id ? 'bg-slate-700 w-full' : ''}`}
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
