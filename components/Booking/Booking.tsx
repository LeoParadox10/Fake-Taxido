"use client"

import React, { useContext, useEffect, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import Cards from './Cards';
import { useRouter } from 'next/navigation';
import { SelectdTaxiAmountContext } from '@/context/SelectedTaxiAmountContext';

function Booking() {
    const { taxiAmount, setTaxiAmount } = useContext(SelectdTaxiAmountContext)
    const [screenHeight, setScreenHeight] = useState(0);
    useEffect(() => {
        setScreenHeight(window.innerHeight * 1.0);
    }, []);
    const router: any = useRouter()
    return (
        <div className='p-5'>
            <h2 className='text-[20px] font-semibold'>Booking</h2>
            <div className='border-[1px] p-5 rounded-md' style={{ height: screenHeight }}>
                <AutocompleteAddress />
                <Cars />
                <Cards />
                <button className={`w-full bg-yellow-400 p-1 rounded-md mt-4 ${!taxiAmount ? 'bg-gray' : null}`}
                    onClick={() => router.push('/payment')}>
                    Book
                </button>
            </div>
        </div>
    )
}

export default Booking