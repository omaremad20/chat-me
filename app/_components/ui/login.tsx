"use client";

import { signInWithGoogle } from '@/app/_lib/services/auth';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function Login({ children }: { children?: React.ReactNode }) {
    const path = usePathname();

    return (
        <div className="m-3 h-[85vh] flex flex-col justify-center items-center text-center space-y-3">
            {children}
            <button aria-label='Login With Google' title='Login With Google' className='my-btn p-2! pb-2.5!  flex items-center space-x-2' onClick={() => signInWithGoogle(path)}>
                <span>Login with google</span>
                <FaGoogle />
            </button>
        </div>
    )
}
