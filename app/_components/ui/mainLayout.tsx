"use client";

import useUserContext from '@/app/_customHooks/useUserContext';
import React from 'react';
import Navbar from './navbar';
import SplashScreen from './splashScreen';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { state } = useUserContext();
    if (state.loading) return <SplashScreen />

    return (
        <div>
            <Navbar />
            <main id='main' className='pt-18'>
                {children}
            </main>
        </div>

    )
}
