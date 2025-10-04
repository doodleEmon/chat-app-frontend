'use client'

import { logout } from '@/redux/actions/auth/authActions'
import { setUser } from '@/redux/slices/auth/authSlice'
import { AppDispatch } from '@/redux/store'
import { AuthResponse } from '@/type'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiCross, BiLogOut, BiMessage, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    const res = await dispatch(logout());

    if (logout.fulfilled.match(res)) {
      setIsDrawerOpen(!isDrawerOpen);
      dispatch(setUser(res.payload as AuthResponse));
      toast.success("Logged out successfully!");
      router.push("/login");
    } else {
      const errorMessage = res.payload as string || "Logged out failed!";
      toast.error(errorMessage);
    }
  }

  return (
    <nav className='shadow'>
      <div className='flex justify-between items-center container mx-auto p-4'>
        <Link href='/' className='flex items-center gap-x-2'>
          <div className='p-2 rounded bg-blue-500 flex items-center justify-center'>
            <BiMessage size={20} />
          </div>
          <p className='text-xl font-semibold text-blue-300'>Chattyfy</p>
        </Link>
        <div className='hidden md:block'>
          <ul className='flex items-center gap-x-5'>
            <li>
              <Link href='/settings' className={`flex items-center gap-x-1 hover:text-blue-300 ${pathname === '/settings' ? 'text-blue-300' : 'text-white'}`}>
                <FiSettings />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link href='/profile' className={`flex items-center gap-x-1 hover:text-blue-300 ${pathname === '/profile' ? 'text-blue-300' : 'text-white'}`}>
                <BiUser />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className='flex items-center gap-x-1 cursor-pointer hover:text-blue-300' type='button'>
                <BiLogOut />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>

        {/* for mobile and tab (drawer) */}
        <div className='block md:hidden'>
          <button onClick={() => setIsDrawerOpen((open) => !open)}><GiHamburgerMenu /></button>
        </div>
        <div className={`fixed top-0 left-0 h-full w-full p-4 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300  ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-x-2'>
              <div className='p-2 rounded bg-blue-500 flex items-center justify-center'>
                <BiMessage size={20} />
              </div>
              <p className='text-xl font-semibold text-blue-300'>Chattyfy</p>
            </Link>
            <button className='cursor-pointer' onClick={() => setIsDrawerOpen((open) => !open)}>
              <ImCross />
            </button>
          </div>
          <hr className='mt-4' />
          <ul className='flex flex-col gap-y-4 mt-4 px-10'>
            <li>
              <Link href='/settings' onClick={() => setIsDrawerOpen((open) => !open)} className={`flex items-center gap-x-1 hover:text-blue-300 ${pathname === '/settings' ? 'text-blue-300' : 'text-white'}`}>
                <FiSettings />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link href='/profile' onClick={() => setIsDrawerOpen((open) => !open)} className={`flex items-center gap-x-1 hover:text-blue-300 ${pathname === '/profile' ? 'text-blue-300' : 'text-white'}`}>
                <BiUser />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className='flex items-center gap-x-1 cursor-pointer hover:text-blue-300' type='button'>
                <BiLogOut />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
