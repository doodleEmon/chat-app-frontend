import { useIsOnline } from '@/hooks/useIsOnline'
import { AuthResponse } from '@/types/auth';
import Image from 'next/image';
import React from 'react'

export default function SidebarUserListItem({ user, isSelected, onSelect } : { user: AuthResponse, isSelected: boolean, onSelect: (user: AuthResponse) => void }) {
    
    const isOnline = useIsOnline(user._id);

    return (
        <div
            key={user._id}
            className={`w-full flex items-center gap-x-4 py-2 px-3 cursor-pointer rounded-lg transition-colors hover:bg-slate-700/50 ${isSelected ? 'bg-slate-700' : ''
                }`}
            onClick={() => onSelect(user)}
        >
            <div className="size-11 md:size-10 lg:size-9 rounded-full overflow-hidden border border-gray-700 flex-shrink-0">
                <Image
                    className="size-full object-cover"
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullname}
                    height={1000}
                    width={1000}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.fullname}</p>
                <p className={`text-sm ${isOnline ? 'text-green-500' : 'text-gray-400'}`}>{isOnline ? 'Online' : 'Offline'}</p>
            </div>
        </div>
    )
}
