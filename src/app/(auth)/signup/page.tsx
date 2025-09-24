'use client'

import { User } from '@/type';
import React, { useState } from 'react'
import { BiMessage } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState<User>({
        fullname: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('formdata', formData);
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='p-2 bg-primary size-12 flex items-center justify-center rounded-full'>
                        <BiMessage size={24} />
                    </div>
                    <h3 className='text-2xl font-semibold'>Create Account</h3>
                    <p className='text-gray-400 text-sm'>Get started with your free account!</p>
                </div>
                <form onSubmit={handleSubmit} className="fieldset rounded-box w-sm p-4 mt-4 space-y-3">
                    <div>
                        <label className="label text-sm mb-1">Full Name</label>
                        <input
                            type="fullname"
                            className="input focus:outline-none w-full"
                            placeholder="Ex: John Doe"
                            value={formData.fullname}
                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="input focus:outline-none w-full"
                            placeholder="Ex: john@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label text-sm mb-1">Password</label>
                        <div className='relative'>
                            {
                                showPassword ? <FaEye size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-50 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Hide password' /> : <FaEyeSlash size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-50 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Show password' />
                            }
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input focus:outline-none w-full"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type='submit' className="btn btn-primary mt-4 rounded">Create Account</button>
                </form>
            </div>
        </div>
    )
}
