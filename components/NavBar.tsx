"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function NavBar() {

    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/sign-up');
    };
    const handleRoot = () => {
        router.push('/')
    }

    return (
        <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-md'>
            <div className='flex gap-10 items-center'>
                <Image src='/logo.png'
                    alt='logo'
                    width={80}
                    height={30}
                    className='w-auto cursor-pointer transition-all'
                    onClick={handleRoot}
                />
                <div className='hidden md:flex gap-6'>
                    <button onClick={handleHomeClick}>
                        <h2 className='hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all'>
                            Home
                        </h2>
                    </button>
                    <h2 className='hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all'>History</h2>
                    <h2 className='hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all'>Help</h2>
                </div>
            </div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default NavBar