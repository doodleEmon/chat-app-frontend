import React from 'react'

export default function SidebarSkeleton() {
    return (
        <div className="flex w-full flex-col gap-4 px-2 py-2">
            <div className="flex items-center gap-2">
                <div className="skeleton size-10 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-2">
                    <div className="skeleton h-3 w-52"></div>
                    <div className="skeleton h-3 w-32"></div>
                </div>
            </div>
        </div>
    )
}
