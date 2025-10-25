import React from 'react'

export default function SidebarSkeleton() {
    return (
        <div className="flex w-full flex-col gap-4 px-2 py-2">
            <div className="flex items-center gap-4 md:gap-2 w-full">
                <div className="skeleton size-12 md:size-10 shrink-0 rounded-full bg-gray-500"></div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="skeleton h-3.5 md:h-3 w-full md:w-52 bg-gray-500"></div>
                    <div className="skeleton h-3.5 md:h-3 w-52 md:w-32 bg-gray-500"></div>
                </div>
            </div>
        </div>
    )
}
