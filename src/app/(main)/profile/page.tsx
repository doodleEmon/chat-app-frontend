import React from 'react'
import ProfileComp from '@/componets/ProfileComp'

export default function Profile() {
  return (
    <div className='flex items-center justify-center p-4 lg:p-0 h-[cal(90vh-4rem)] overflow-hidden overflow-y-scroll'>
      <ProfileComp />
    </div>
  )
}
