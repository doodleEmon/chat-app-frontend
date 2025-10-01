import Link from 'next/link'
import React from 'react'
import { BiLogOut, BiMessage, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'

export default function Header() {
  return (
    <nav className='shadow'>
      <div className='flex justify-between items-center container mx-auto p-4'>
        <Link href='/' className='flex items-center gap-x-2'>
          <div className='p-2 rounded-full bg-blue-500 flex items-center justify-center'>
            <BiMessage size={18} />
          </div>
          <p className='text-xl font-semibold text-blue-400'>Chatty</p>
        </Link>
        <div>
          <ul className='flex items-center gap-x-5'>
            <li>
              <Link href='/settings' className='flex items-center gap-x-1'>
                <FiSettings />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link href='/profile' className='flex items-center gap-x-1'>
                <BiUser />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <Link href='/logout' className='flex items-center gap-x-1'>
                <BiLogOut />
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
