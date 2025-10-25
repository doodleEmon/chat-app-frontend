'use client'

import { getUsers } from '@/redux/actions/messages/messagesActions';
import { setSelectedUser, setUsers } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SidebarSkeleton from '@/componets/SidebarSkeleton';
import { searchUsers } from '@/redux/actions/auth/authActions';
import Loader from '@/componets/Loader';
import { AuthResponse } from '@/types/auth';
import { useIsOnline } from '@/hooks/useIsOnline';
import SidebarUserListItem from './SidebarUserListItem';

export default function Sidebar() {
    const { users, usersLoading, selectedUser } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();
    const [searchText, setSearchText] = useState<string>("");
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const { searchLoading, searchedUsers, searchedError } = useSelector((state: RootState) => state.auth);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await dispatch(getUsers());

            if (getUsers.rejected.match(res)) {
                const errorMessage = res.payload as string || "Loading user failed!";
                toast.error(errorMessage);
            }
        }
        fetchUsers();
    }, [dispatch]);

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const trimmedSearchText = useMemo(() => searchText.trim(), [searchText]);

    const handleSearch = useCallback(async (query: string) => {
        if (!query) return;
        try {
            await dispatch(searchUsers(query)).unwrap();
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    // Debounced search
    useEffect(() => {
        if (!trimmedSearchText) return;

        const timeout = setTimeout(() => {
            handleSearch(trimmedSearchText);
        }, 500);

        return () => clearTimeout(timeout);
    }, [trimmedSearchText, handleSearch]);

    const handleClearSearch = () => {
        setSearchText("");
        setIsSearchFocused(false);
    };

    const handleSelectSearchedUser = (user: AuthResponse) => {
        dispatch(setSelectedUser(user));
        dispatch(setUsers(user));
        setSearchText("");
        setIsSearchFocused(false);
    };

    const showSearchDropdown = isSearchFocused && searchText.length > 0;

    const handleSelectUser = (user: AuthResponse) => {
        dispatch(setSelectedUser(user));
    }

    return (
        <div className="pt-5 pb-12 pl-5 pr-4 bg-[#1D232A] relative">
            {/* Search Input */}
            <div className='w-full relative' ref={searchRef}>
                <input
                    className='py-3 pl-10 pr-10 w-full bg-[#1D232A] border border-gray-500 rounded-lg focus:outline-none focus:border-white text-white transition-colors'
                    type="text"
                    placeholder='Search by name or email'
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                />
                <BiSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                {/* Clear button */}
                {searchText && (
                    <button
                        onClick={handleClearSearch}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer'
                        aria-label="Clear search"
                    >
                        <BiX size={20} />
                    </button>
                )}

                {/* Search Results Dropdown */}
                {showSearchDropdown && (
                    <div className='absolute top-full mt-2 w-full max-h-80 bg-gray-700 border border-gray-700 rounded-lg shadow-2xl overflow-hidden'>
                        {searchLoading === 'pending' ? (
                            <div className='h-40 flex items-center justify-center'>
                                <Loader />
                            </div>
                        ) : searchLoading === 'succeeded' ? (
                            searchedUsers && searchedUsers.length > 0 ? (
                                <div className='overflow-y-auto max-h-80 scrollbar-thin'>
                                    {searchedUsers.map((user: any) => (
                                        <div
                                            key={user._id}
                                            className='flex items-center gap-x-3 p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-b-0'
                                            onClick={() => handleSelectSearchedUser(user)}
                                        >
                                            <div className="size-9 rounded-full overflow-hidden border border-gray-700 flex-shrink-0">
                                                <Image
                                                    className="size-full object-cover"
                                                    src={user.profilePic || "/avatar.png"}
                                                    alt={user.fullname}
                                                    height={36}
                                                    width={36}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">{user.fullname}</p>
                                                <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='h-32 flex flex-col items-center justify-center text-gray-400'>
                                    <BiSearch size={32} className='mb-2 opacity-50' />
                                    <p className='text-sm'>No users found</p>
                                </div>
                            )
                        ) : searchedError ? (
                            <div className='h-32 flex flex-col items-center justify-center text-white'>
                                <p className='text-sm'>No users found</p>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* User List */}
            <div className="h-full w-full overflow-y-scroll mt-4 mb-24 space-y-2 scrollbar-thin">
                {usersLoading === "idle" || usersLoading === "pending" ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <SidebarSkeleton key={index} />
                    ))
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <SidebarUserListItem
                            key={user._id}
                            user={user}
                            isSelected={selectedUser?._id === user._id}
                            onSelect={handleSelectUser}
                        />
                    )
                    )
                ) : (
                    <p className="text-center text-gray-400 mt-4">No user found.</p>
                )}
            </div>
        </div>
    )
}