import Link from 'next/link'
import React from 'react'
import { BiMessage } from 'react-icons/bi'

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='p-2 bg-primary size-12 flex items-center justify-center rounded-full'>
                        <BiMessage size={24} />
                    </div>
                    <h3 className='text-2xl font-semibold'>Welcome Back!</h3>
                    <p className='text-gray-400 text-sm'>Login to your account.</p>
                </div>
                <form className="fieldset rounded-box w-sm p-4 mt-4 space-y-3">
                    <div>
                        <label className="label text-sm mb-1">Email</label>
                        <input type="email" className="input focus:outline-none w-full" placeholder="Ex: john@gmail.com" />
                    </div>
                    <div>
                        <label className="label text-sm mb-1">Password</label>
                        <input type="password" className="input focus:outline-none w-full" placeholder="********" />
                    </div>
                    <button className="btn btn-primary mt-4 rounded">Login</button>
                </form>
                <div className='flex items-center justify-center mt-2'>
                    <p className='text-sm text-slate-300'>Don't have any account? <Link href="/signup" className='text-blue-400 hover:underline cursor-pointer'>Create account</Link></p>
                </div>
            </div>
        </div>
    )
}
