'use client'


import { logout } from '@/redux/actions/auth/authActions'
import { setUser } from '@/redux/slices/auth/authSlice'
import { AppDispatch } from '@/redux/store'
import { AuthResponse } from '@/type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiLogOut, BiMessage, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await dispatch(logout());

    if (logout.fulfilled.match(res)) {
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
              <button onClick={handleLogout} className='flex items-center gap-x-1 cursor-pointer' type='button'>
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
