import Link from 'next/link'
import React from 'react'
import { BiLogOut, BiMessage, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'

export default function Header() {
  return (
    <nav className='shadow'>
      <div className='flex justify-between items-center container mx-auto p-4'>
        <div className='flex items-center gap-x-2'>
          <BiMessage />
          <p>Chatty</p>
        </div>
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
