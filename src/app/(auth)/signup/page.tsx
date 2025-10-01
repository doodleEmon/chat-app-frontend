'use client'

import { signUp } from '@/redux/actions/auth/authActions';
import { setUser } from '@/redux/slices/auth/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthResponse, SignupDataType } from '@/type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiMessage, BiUser } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Signup() {
    const [formData, setFormData] = useState<SignupDataType>({
        fullname: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessageFullname, setErrorMessageFullname] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth)
    const router = useRouter();

    const validateData = () => {
        let isValid = true;

        // reset old errors
        setErrorMessageFullname('');
        setErrorMessageEmail('');
        setErrorMessagePassword('');

        // full name
        if (!formData.fullname.trim()) {
            setErrorMessageFullname("Full name is required!");
            isValid = false;
        } else if (formData.fullname.length < 3) {
            setErrorMessageFullname("Full name must be at least 3 characters!");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
            setErrorMessageFullname("Full name can only contain letters and spaces!");
            isValid = false;
        }

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

        const res = await dispatch(signUp(formData));

        if (signUp.fulfilled.match(res)) {
            dispatch(setUser(res.payload as AuthResponse));
            toast.success("Account created successfully!");
            router.push("/");
        } else {
            const errorMessage = res.payload as string || "Account creation failed!";
            toast.error(errorMessage);
        }
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
                        <div className='relative'>
                            <BiUser size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 z-50" />
                            <input
                                type="fullname"
                                className="input focus:outline-none w-full pl-8"
                                placeholder="John Doe"
                                value={formData.fullname}
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                            />
                        </div>
                        <p className={`text-sm text-red-500 mt-2 ${errorMessageFullname ? 'block' : 'hidden'}`}>{errorMessageFullname && errorMessageFullname}</p>
                    </div>
                    <div>
                        <label className="label text-sm mb-1">Email</label>
                        <div className='relative'>
                            <MdOutlineEmail size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 z-50" />
                            <input
                                type="text"
                                className="input focus:outline-none w-full pl-8"
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
                            <MdLockOutline size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 z-50" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input focus:outline-none w-full pl-8"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {
                                showPassword ? <FaEye size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-50 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Hide password' /> : <FaEyeSlash size={16} className={`${formData.password === '' ? 'hidden' : 'absolute'} right-3 top-1/2 -translate-y-1/2 z-50 cursor-pointer`} onClick={() => setShowPassword((s) => !s)} title='Show password' />
                            }
                        </div>
                        <p className={`text-sm text-red-500 mt-2 ${errorMessagePassword ? 'block' : 'hidden'}`}>{errorMessagePassword && errorMessagePassword}</p>
                    </div>
                    <button type='submit' className="btn btn-primary mt-4 rounded">{loading === 'pending' ? <span className='flex items-center gap-x-1'><CgSpinner size={16} className="animate-spin" /> Creating account...</span> : <span>Create Account</span>}</button>
                </form>
                <div className='flex items-center justify-center mt-2'>
                    <p className='text-sm text-slate-300'>Already have an account? <Link href="/login" className='text-blue-400 hover:underline cursor-pointer'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}
