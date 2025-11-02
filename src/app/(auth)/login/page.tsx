"use client"

import { login } from '@/redux/actions/auth/authActions'
import { AppDispatch, RootState } from '@/redux/store'
import { LoginDataType } from '@/types/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiMessage } from 'react-icons/bi'
import { CgSpinner } from 'react-icons/cg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function Login() {
    const [formData, setFormData] = useState<LoginDataType>({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const validateData = () => {
        let isValid = true;

        // reset old errors
        setErrorMessageEmail('');
        setErrorMessagePassword('');

        // email
        if (!formData.email.trim()) {
            setErrorMessageEmail('Email is required!')
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorMessageEmail('Enter a valid email address!')
            isValid = false;
        }

        // password
        if (!formData.password.trim()) {
            setErrorMessagePassword('Password is required!');
            isValid = false;
        } else if (formData.password.length < 8) {
            setErrorMessagePassword('Password must be at least 8 characters!');
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/.test(formData.password)) {
            setErrorMessagePassword('Password must contain at least 1 uppercase letter, 1 number, and 1 special character!');
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = validateData();
        if (!success) {
            toast.error("Unable to proceed. Please provide valid information!");
            return;
        }

        const res = await dispatch(login(formData));

        if (login.fulfilled.match(res)) {
            router.push("/");
            toast.success("Login successful!");
        } else {
            const errorMessage = res.payload as string || "Login failed!";
            toast.error(errorMessage);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='p-2 bg-indigo-500 size-12 flex items-center justify-center rounded-full'>
                        <BiMessage size={24} className='text-white' />
                    </div>
                    <h3 className='text-2xl font-semibold text-white'>Welcome Back!</h3>
                    <p className='text-gray-300 text-sm'>Login to your account and chat with others.</p>
                </div>
                <form onSubmit={handleSubmit} className="fieldset rounded-box w-sm p-4 mt-4 space-y-3">
                    <div>
                        <label className="label text-sm mb-1">Email</label>
                        <div className='relative'>
                            <MdOutlineEmail size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 z-40" />
                            <input
                                type="text"
                                className="input focus:outline-none w-full pl-8 border-gray-500 bg-[#1D232A] focus:border-white text-white"
                                placeholder="john@gmail.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <p className={`text-sm text-red-500 mt-2 ${errorMessageEmail ? 'block' : 'hidden'}`}>{errorMessageEmail && errorMessageEmail}</p>
                    </div>
                    <div>
                        <label className="label text-sm mb-1">Password</label>
                        <div className='relative'>
                            <MdLockOutline size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 z-40" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input focus:outline-none w-full pl-8 border-gray-500 bg-[#1D232A] focus:border-white text-white"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {
                                showPassword ? <FaEye size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-40 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Hide password' /> : <FaEyeSlash size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-40 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Show password' />
                            }
                        </div>
                        <p className={`text-sm text-red-500 mt-2 ${errorMessagePassword ? 'block' : 'hidden'}`}>{errorMessagePassword && errorMessagePassword}</p>
                    </div>
                    <button type='submit' className="p-3 mt-4 bg-indigo-600 rounded text-base cursor-pointer text-center">{loading === 'pending' ? <span className='flex items-center justify-center gap-x-1'><CgSpinner size={16} className="animate-spin" /> Logging in...</span> : <span>Login</span>}</button>
                </form>
                <div className='flex items-center justify-center mt-2'>
                    <p className='text-sm text-slate-300'>Don&apos;t have any account? <Link href="/signup" className='text-blue-400 hover:underline cursor-pointer'>Create account</Link></p>
                </div>
            </div>
        </div>
    )
}
