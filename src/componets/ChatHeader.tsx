import { useIsOnline } from '@/hooks/useIsOnline';
import { setRemoveUser, setSelectedUser } from '@/redux/slices/messages/messageSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthResponse } from '@/types/auth';
import Image from 'next/image'
import React from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux';

export default function ChatHeader() {
    const { selectedUser, messages } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();

    const isOnline = useIsOnline(selectedUser?._id);

    const handleCloseMessage = () => {
        if (messages.length === 0) {
            dispatch(setSelectedUser(null));
            dispatch(setRemoveUser(selectedUser as AuthResponse));
        } else {
            dispatch(setSelectedUser(null));
        }
    }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-4'>
                {/* 🔥 UPDATED: Added relative positioning for online indicator */}
                <div className='relative size-10 object-cover rounded-full overflow-hidden'>
                    <Image
                        className='rounded-full'
                        src={selectedUser?.profilePic || '/avatar.png'}
                        alt={selectedUser?.fullname || 'User'}
                        height={1000}
                        width={1000}
                    />
                </div>
                <div className='flex flex-col gap-0'>
                    <h3 className='text-base font-semibold'>{selectedUser?.fullname}</h3>
                    {/* 🔥 UPDATED: Dynamic online/offline status */}
                    <p className='text-sm text-gray-400'>
                        {isOnline ? (
                            <span className="text-green-500">Online</span>
                        ) : (
                            <span className="text-slate-400">Offline</span>
                        )}
                    </p>
                </div>
            </div>
            <button onClick={handleCloseMessage} className='cursor-pointer'>
                <ImCross size={12} />
            </button>
        </div>
    )
}