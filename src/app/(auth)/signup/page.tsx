import React from 'react'
import { BiMessage } from 'react-icons/bi'

export default function Signup() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='p-2 bg-primary size-12 flex items-center justify-center rounded-full'>
                        <BiMessage size={24}/>
                    </div>
                    <h3 className='text-2xl font-semibold'>Create Account</h3>
                    <p className='text-gray-400 text-sm'>Get started with your free account!</p>
                </div>
                <fieldset className="fieldset rounded-box w-xs p-4 mt-4">

                    <label className="label">Full Name</label>
                    <input type="fullname" className="input focus:outline-none" placeholder="Full Name" />

                    <label className="label">Email</label>
                    <input type="email" className="input focus:outline-none" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input focus:outline-none" placeholder="Password" />

                    <button className="btn btn-primary mt-4">Create Account</button>
                </fieldset>
            </div>
        </div>
    )
}
